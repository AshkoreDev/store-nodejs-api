const boom = require('@hapi/boom');
const { ValidationError } = require('sequelize');

function legErrors(err, req, res, next) {

  console.log(err);
  next(err);
};


function errorHandler(err, req, res, next) {

  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
};


function boomErrorHandler(err, req, res, next) {

  if(err.isBoom) {

    const { output } = err;

    res.status(output.statusCode).json({ 
      error: output.payload. error,
      message: output.payload.message
    });

  } else {

    next(err);
  }
};


function ormErrorHandler(err, req, res, next) {

  if(err instanceof ValidationError) {

    res.status(409).json({
      statusCode: 409,
      error: err.name,
      message: err.errors[0].message
    });

  } else {

    next(err);
  }
};


module.exports = { legErrors, errorHandler, boomErrorHandler, ormErrorHandler };