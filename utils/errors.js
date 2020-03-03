'use strict';

exports.HttpError = class extends Error {
  constructor(status, message) {
    super(message);
    this.type = 'httpError';
    this.status = status;
  }
};
