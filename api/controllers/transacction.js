const {signTransaction} = require('../../services/keyvault');
const {provider} = require('../../utils/ethersProvider');
const utils = require('ethers').utils;

const sign = async (req, res, next) => {
  try {
    let {transaction} = req.body;
    
    const chainId = await provider.chainId;
    
    if (transaction.gasPrice === undefined) {
      const gasPrice =  await provider.getGasPrice();
      transaction.gasPrice = gasPrice.toHexString();
    }

    if (transaction.gas === undefined) {
      const gas =  await provider.estimateGas(transaction);
      transaction.gas = gas.toHexString();
    }
    
    if (transaction.value) {
      const valueBN = utils.bigNumberify(transaction.value);
      transaction.value = valueBN.toHexString();
    }

    const nonce = await provider.getTransactionCount(transaction.from);
        
    transaction = {
      ...transaction,
      nonce,
      chainId
    };

    console.log(transaction);

    const signedTx = await signTransaction(transaction, req.body.keyId, chainId);

    const txHash = await provider.sendTransaction(`0x${signedTx.toString("hex")}`);

    res.status(200).json({ txHash });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  sign,
};
