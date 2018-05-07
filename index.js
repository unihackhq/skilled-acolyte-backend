const Hapi = require('hapi');
const Boom = require('boom');

const { requestErrorScrubber } = require('./app/util/good');
const env = require('./env');
const routes = require('./app/routes');
const models = require('./app/models');
const jwt = require('./app/util/jwt');

exports.init = async () => {
  const hapiOptions = {
    host: env.API_HOST,
    port: env.API_PORT,
    routes: {
      validate: {
        failAction: async (request, h, err) => {
          // Throw Boom errors out to the request. This handles explicit Joi validation errors
          if (Boom.isBoom(err)) {
            throw err;
          }
        },
      },
      cors: { origin: 'ignore' }
    },
  };

  const server = new Hapi.Server(hapiOptions);

  // JWT is the authentication strategy
  await server.register(require('hapi-auth-jwt2'));
  server.auth.strategy('jwt', 'jwt', {
    key: env.JWT_KEY,
    validate: jwt.validate,
    verifyOptions: { algorithms: ['HS256'], tokenType: 'Bearer' },
  });
  server.auth.default('jwt');

  // Register the routes, stored in routes.js
  server.route(routes);

  // logging
  if (!env.TESTING) {
    const options = {
      ops: env.PROD ? { interval: 1000 } : false,
      includes: {
        response: ['payload', 'headers'],
        request: ['payload', 'headers'],
      },
      reporters: {
        raw: [{
          module: requestErrorScrubber
        }, {
          module: 'good-squeeze',
          name: 'SafeJson',
          args: [null, { space: 2 }]
        }, 'stdout'],
        summary: [{
          module: 'good-console'
        }, 'stdout'],
      }
    };
    await server.register({
      plugin: require('good'),
      options,
    });
  }

  // connect to db
  await models.sequelize.sync();
  // Start the server
  await server.start();
  return server;
};
