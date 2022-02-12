require('dotenv').config();
const azure = require('./azure');
const app = require('./app');
const ethersProvider = require('./ethersProvider');

module.exports = {
  azure,
  app,
  ethersProvider,
};
