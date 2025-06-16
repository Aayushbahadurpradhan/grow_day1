exports.sendValidationError = (res, errors, statusCode = 422, message = 'The request is failed due to validation problem',errorDetails = '') => {
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    error: errors.map(err => ({
      type: 'field',
      value: err.value,
      msg: err.msg,
      path: err.path,
      location: err.location,
      errorDetails:errorDetails
    }))
  });
};

exports.sendError = (res, statusCode = 500, message = 'Something went wrong') => {
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};
