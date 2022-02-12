let {KeyVaultCredentials, KeyVaultClient} = require('azure-keyvault');

const {azure} = require('../config');
const createAuthenticator = require('../utils/authenticator');
const {keyToPublic, publicToAddress} = require('../utils/key');
const makeCanonical = require('../utils/makeCanonical');
const secp256k1 = require('secp256k1');
const assert = require('assert');
const _ = require('underscore');
const Tx = require('ethereumjs-tx');

const authenticator = createAuthenticator(azure.keyVault.clientId, azure.keyVault.clientSecret);

const createAccount = async (keyId) => {
  const kvCredentials = new KeyVaultCredentials(authenticator);
  const kvClient = new KeyVaultClient(kvCredentials);

  const keyOptions = {
    curve: 'SECP256K1',
    keyOps: ['sign'],
  };

  const key = await kvClient.createKey(azure.keyVault.uri, keyId, 'EC-HSM', keyOptions);

  const pubKey = keyToPublic(key);

  return publicToAddress(pubKey);
};

const signTransaction = async (transaction, keyId, chainId) => {
  const kvCredentials = new KeyVaultCredentials(authenticator);
  const kvClient = new KeyVaultClient(kvCredentials);

  const keyBundle = await kvClient.getKey(azure.keyVault.uri, keyId, '');

  const pubKey = keyToPublic(keyBundle);

  const addressBuffer = publicToAddress(pubKey);

  const address = `0x${addressBuffer.toString('hex')}`

  assert.equal(address, transaction.from);

  const tx = new Tx(transaction);
  const msgHash = tx.hash(false);

  const signResult = await kvClient.sign(
    azure.keyVault.uri,
    keyId,
    '',
    "ECDSA256",
    msgHash
  );

  const signature = makeCanonical(Buffer.from(signResult.result));
  
  assert.equal(true, secp256k1.verify(msgHash, signature, pubKey));

  let v = -1;
  // Recover the public key by comparing the recovered key with the actual public key.
  // If a match is found, that's the value of 'v'
  for (let i = 0; i <= 1; i++) {
    const recoveredPubKey = secp256k1.recover(msgHash, signature, i, false);
    if (_.isEqual(pubKey, recoveredPubKey)) {
      v = i;
      break;
    }
  }
  assert.equal(true, v === 0 || v === 1);

  // As per the EIP-155 spec, the value of 'v' is also dependent on the chain id.
  // See: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md#specification
  v += 27;
  if (chainId > 0) {
    v += chainId * 2 + 8;
  }

  tx.r =  signature.slice(0, 32);
  tx.s = signature.slice(32, 64);
  tx.v =  Buffer.from([v]);

  return tx.serialize();
};

module.exports = {
  createAccount,
  signTransaction
};
