const {expect} = require('chai');
const {keyToPublic, publicToAddress} = require('../../utils/key');
const secp256k1 = require('secp256k1');

describe ('utils/key', () => {
  describe ('keyToPub', () => {
    const x = Uint8Array.from([134]);
    const y = Uint8Array.from([255]);

    const payload = {
      key: {x, y},
    };

    it ('should return a public key', () => {
      const result = keyToPublic(payload);

      const expected = `04${Buffer.from(x).toString('hex')}${Buffer.from(y).toString('hex')}`;

      expect(result.toString('hex')).to.be.equal(expected);
    });
  });

  describe ('publicToAddress', () => {
    const knownAccount = {
      privateKey: '0000000000000000000000000000000000000000000000000000000000000001',
      address: '7e5f4552091a69125d5dfcb7b8c2659029395bdf',
    };

    it ('should return the ethereum address of a public key', () => {
      const privKey = Buffer.from(knownAccount.privateKey, 'hex');
      const pubKey = secp256k1.publicKeyCreate(privKey, false);

      const expected = knownAccount.address;
      const result = publicToAddress(pubKey);

      expect(result.toString('hex')).to.be.equal(expected);
    });
  });
});
