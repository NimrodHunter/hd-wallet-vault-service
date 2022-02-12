let address;
let willFail = false;

const createAccount = jest.fn().mockImplementation((key) => {
  if (willFail) throw new Error('Failed to create key');
  return Buffer.from(address, 'hex');
});

module.exports = {
  createAccount,
  __setAddress__: addr => address = addr,
  __willFail__: () => willFail = true,
};
