const {AuthenticationContext} = require('adal-node');

module.exports = (clientId, clientSecret) => (challenge, callback) => {
  const context = new AuthenticationContext(challenge.authorization);

  // Use the context to acquire an authentication token.
  return context.acquireTokenWithClientCredentials(challenge.resource, clientId, clientSecret, (err, tokenResponse) => {
      if (err) throw err;
      // Calculate the value to be set in the request's Authorization header and resume the call.
      const authorizationValue = `${tokenResponse.tokenType} ${tokenResponse.accessToken}`;

      return callback(null, authorizationValue);
  });
};
