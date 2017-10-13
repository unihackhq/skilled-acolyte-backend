const Boom = require('boom');

module.exports = {
  successDelete: (modelName) => {
    const message = `Successfully deleted ${modelName}`;
    return {
      statusCode: '200',
      message,
    };
  },
  notFound: (modelName) => {
    const message = `There is no ${modelName} with that id`;
    return Boom.notFound(message);
  },
  invalid: (command, modelName) => {
    const message = `Unable to ${command} ${modelName}`;
    return Boom.internal(message);
  },

};
