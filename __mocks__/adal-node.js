let error = false;

const mockAcquireTokenWithClientCredentials = jest.fn().mockImplementation((resource, id, secret, callback) => {
  if (error) throw new Error('Error');
});

const mockAuthenticationContext = jest.fn().mockImplementation((authorization) => {
  return {
    acquireTokenWithClientCredentials: mockAcquireTokenWithClientCredentials,
    __willFail__: function() { error = true },
    __willPass__: function() { error = false },
  };
});

module.exports = {
  AuthenticationContext: mockAuthenticationContext,
  mockAcquireTokenWithClientCredentials,
};
