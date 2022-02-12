const serverless = require('serverless-http');
const app = require('./api');

module.exports.service = serverless(app);
