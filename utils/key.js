const Keccak = require('keccak');
const secp256k1 = require('secp256k1');

const keyToPublic = (keyBundle) => {
  return Buffer.concat([Buffer.from('04', 'hex'), keyBundle.key.x, keyBundle.key.y]);
};

const publicToAddress = (pubKey) => {
  let address;
  if (pubKey.length !== 64) {
    const payload = secp256k1.publicKeyConvert(pubKey, false);
    address = Keccak('keccak256').update(payload.slice(1)).digest().slice(-20);
  } else {
    address = Keccak('keccak256').update(pubKey).digest().slice(-20);
  }
  return address;
};

module.exports = {
  keyToPublic,
  publicToAddress,
};
