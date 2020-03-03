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

  const existingUser = User.findOne({ email: payload.email });

  if(!existingUser) {
    return res.status(404).send({
      error: {
        status: res.statusCode,
        message: "User does not exist",
      }
    });
  }
  console.log(existingUser);
  res.locals.user = existingUser[0];
  next();
};