const providers = require('ethers').providers;
const config = require('../config');

module.exports = {
  provider: new providers.InfuraProvider(config.ethersProvider.name, config.ethersProvider.token)
};
