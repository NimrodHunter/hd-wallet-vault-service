const {createAccount} = require('../../services/keyvault');

// @TODO: We need a way to be sure that the user doesn't have a wallet already
// @TODO: We need a way to be sure that the request was made from the platform itself
const create = async (req, res, next) => {
  try {
    const address = await createAccount(req.body.keyId);

    res.status(201).json({ address: `0x${address.toString('hex')}` });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
};
