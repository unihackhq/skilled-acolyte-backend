const Hapi = require('hapi');

const { requestErrorScrubber } = require('./app/util/good');
const env = require('./env');
const routes = require('./app/routes');
const models = require('./app/models');
const Token = require('./app/util/token');

const init = async () => {
  const server = new Hapi.Server({ host: env.API_HOST, port: env.API_PORT });

  // JWT is the authentication strategy
  await server.register(require('hapi-auth-jwt2'));
  server.auth.strategy('jwt', 'jwt', {
    key: env.JWT_KEY,
    validate: Token.validate,
    verifyOptions: { algorithms: ['HS256'], tokenType: 'Bearer' },
  });
  server.auth.default('jwt');

  // Register the routes, stored in routes.js
  server.route(routes);

  // logging
  const options = {
    ops: env.DEV ? false : { interval: 1000 },
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

  // db up
  await models.sequelize.sync();
  // Start the server
  await server.start();
  console.log(`Started. Running on ${server.info.uri}`);
};

init().catch(err => console.log(`Unexpected error ${err.message}\n`, err));
