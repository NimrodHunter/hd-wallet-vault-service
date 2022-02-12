const BN = require("bn.js");

const CURVE_ORDER = new BN(
  Buffer.from(
    "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141",
    "hex"
  )
);

const HALF_CURVE_ORDER = CURVE_ORDER.clone().ishrn(1);

function isHigh(num) {
  return num.ucmp(HALF_CURVE_ORDER) === 1;
}

module.exports = (buffer) => {
  let r = new BN(buffer.slice(0, 32));
  let s = new BN(buffer.slice(32, 64));

  if (isHigh(s)) {
    s = CURVE_ORDER.sub(s);
  }

  return Buffer.concat([r.toBuffer(), s.toBuffer()]);
}