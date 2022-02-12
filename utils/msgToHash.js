const rlp = require('rlp');
const createKeccakHash = require('keccak');

module.exports = (msg) => {
  msg = rlp.encode(msg);
  return createKeccakHash('keccak256').update(msg).digest();
}