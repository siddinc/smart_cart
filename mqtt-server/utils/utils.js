'use strict';

exports.mapUserIPToCartIP = userIP => {
  const splitUserIP = userIP.split('.');
  const lastThreeBits = String(
    parseFloat(splitUserIP[splitUserIP.length - 1]) + 1
  );
  return `${splitUserIP[0]}.${splitUserIP[1]}.${
    splitUserIP[2]
  }.${lastThreeBits}`;
};
