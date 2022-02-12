const {createAccount} = require('../../services/keyvault');
const {KeyVaultClient, mockCreateKey} = require('azure-keyvault');
const {azure} = require('../../config');

beforeEach(() => {
  KeyVaultClient.mockClear();
  mockCreateKey.mockClear();
});

describe ('services/keyvault', () => {
  describe ('createAccount', () => {
    it ('should return the address of the account created', async () => {
      const keyId = 'testkeyid';
      const keyOptions = { curve: 'SECP256K1', keyOps: ['sign'] };
      const ecType = 'EC-HSM';

      const result = await createAccount(keyId);
      const expected = '4a8b2310bd8314183222466f9903c7ebd08fadd0';

      expect(KeyVaultClient).toHaveBeenCalledTimes(1);

      expect(mockCreateKey).toHaveBeenCalledTimes(1);
      expect(mockCreateKey).toHaveBeenLastCalledWith(azure.keyVault.uri, keyId, ecType, keyOptions);
      expect(result.toString('hex')).toBe(expected);
    });
  });
});