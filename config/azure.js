module.exports = {
  keyVault: {
    clientId: process.env.KV_CLIENT_ID || '',
    clientSecret: process.env.KV_CLIENT_SECRET || '',
    uri: process.env.KV_URI || '',
  },
};
