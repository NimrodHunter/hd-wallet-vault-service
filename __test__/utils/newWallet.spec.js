//const newWallet = require('../../utils/newWallet');
const hdkey = require('ethereumjs-wallet/hdkey');
const bip39 = require('bip39');

describe ('new wallet', () => {
    it ('should return a wallet', () => {
      const mnemonic = bip39.generateMnemonic();
      console.log(mnemonic);
      let wallet = hdkey.fromMasterSeed(mnemonic);
      console.log('master wallet');
      console.log(wallet);
      const path = 'm/44\'/60\'';
      const path5 = 'm/44\'/60\'/0\'/0/0';
      const wallet3 = wallet.derivePath(path);
      console.log('ethereum wallet');
      console.log(wallet3);
      const wallet5 = wallet.derivePath(path5);
      console.log('account 0');
      console.log(wallet5)
      
      const xpriv = wallet3.privateExtendedKey();

      const wallet2 = hdkey.fromExtendedKey(xpriv);
      console.log(wallet2);
      const path2 = 'm/0\'/0/0';
      const account0 = wallet2.derivePath(path2);
      console.log(account0);
     




    });
});