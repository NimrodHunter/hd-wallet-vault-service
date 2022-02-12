const {AuthenticationContext, mockAcquireTokenWithClientCredentials} = require('adal-node');
const makeAuthenticator = require('../../utils/authenticator');
jest.mock('adal-node');

beforeEach(() => {
  AuthenticationContext.mockClear();
  mockAcquireTokenWithClientCredentials.mockClear();
});

describe ('utils/authenticator', () => {
  describe('createAuthenticator', () => {
    it ('should pass', () => {
      const clientId = 'testclientid';
      const secret = 'testsecret';

      const authenticator = makeAuthenticator(clientId, secret);

      const challenge = {
        authorization: 'authorization',
        resource: 'resource',
      };

      authenticator(challenge, null);

      expect(AuthenticationContext).toHaveBeenCalledTimes(1);
      expect(AuthenticationContext).toHaveBeenCalledWith(challenge.authorization);

      expect(mockAcquireTokenWithClientCredentials).toHaveBeenCalledTimes(1);
      expect(mockAcquireTokenWithClientCredentials)
        .toHaveBeenCalledWith(
          challenge.resource,
          clientId,
          secret,
          expect.any(Function)
        );
    });

    it ('should fail', () => {
      AuthenticationContext().__willFail__();
      const authenticator = makeAuthenticator(null, null);

      expect(() => authenticator({}, null)).toThrow(/Error/);
    });
  });
});