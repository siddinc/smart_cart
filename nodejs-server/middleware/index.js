'use strict';

const User = require('../models/user');
const { verifyJwt, extractJwt } = require('../utils/utils');

exports.verifyAuthentication = async (req, res, next) => {
  let payload;
  const token = extractJwt(req);

  if(!token) {
    return res.status(400).send({
      error: {
        status: res.statusCode,
        message: "No JWT provided",
      }
    });
  }

  try {
    payload = await verifyJwt(token);
  } catch(error) {
    return next(error);
  }

  const existingUser = await User.findOne({ mobile: payload.mobile });

  if(!existingUser) {
    return res.status(404).send({
      error: {
        status: res.statusCode,
        message: "User does not exist",
      }
    });
  }
  res.locals.user = existingUser;
  next();
};

exports.verifyAuthorization = async (req, res, next) => {
  const { mobile } = req.body;

  if(res.locals.user.mobile !== mobile) {
    return res.status(403).send({
      error: {
        status: res.statusCode,
        message: 'User unauthorized to perform this action.',
      },
    });
  }
  next();
};