const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');

module.exports = () => {
    const mnemonic = bip39.generateMnemonic();
    const wallet = hdkey.fromMasterSeed(mnemonic);
    console.log(wallet);
    const path = 'm/44\'/60\'';
    return wallet.derivePath(path);
}

