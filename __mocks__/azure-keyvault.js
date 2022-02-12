let x = Buffer.from('82006e9398a6986eda61fe91674c3a108c399475bf1e738f19dfc2db11db1d28', 'hex');
let y = Buffer.from('130c6b3b28aef9a9c7e7143dac6cf12c09b8444db61679abb1d86f85c038a58c', 'hex');

const mockCreateKey = jest.fn()
  .mockReturnValue({
    key: { x, y }
  });
const mockKeyVaultCredentials = jest.fn();
const mockKeyVaultClient = jest.fn().mockImplementation((credentials) => {
  return {
    createKey: mockCreateKey,
    __setKey__(key) {
      x = key.x;
      y = key.y;
    }
  }
});

module.exports = {
  KeyVaultCredentials: mockKeyVaultCredentials,
  KeyVaultClient: mockKeyVaultClient,
  mockCreateKey,
};
