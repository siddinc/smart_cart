'use strict';

const { HttpError } = require('./errors');

exports.errorHandler = errorObject => {
  if (errorObject instanceof HttpError) {
    return {
      statusCode: errorObject.status,
      body: { message: errorObject.message },
    };
  }
  return {
    statusCode: 500,
    body: { message: errorObject.message },
  };
};
