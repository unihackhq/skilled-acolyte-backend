const Hapi = require('hapi');
const corsHeaders = require('hapi-cors-headers');

const env = require('./env');
const routes = require('./app/routes');
const models = require('./app/models');
const validate = require('./app/util/Token');

const init = async () => {
  const app = new Hapi.Server({ host: env.API_HOST, port: env.API_PORT });

  // Register the JWT authentication plugin
  await app.register(require('hapi-auth-jwt2'));

  // JWT is the authentication strategy
  app.auth.strategy('jwt', 'jwt', {
    key: env.JWT_KEY,
    validate,
    verifyOptions: { algorithms: ['HS256'] },
  });

  // Register the routes, stored in routes.js
  app.route(routes);

  app.ext('onPreResponse', corsHeaders);

  // If we're not running tests, pretty print request/response
  // TODO: Use good, good-console and good-squeeze
  if (!env.TESTING) {
    app.events.on('response', (request) => {
      console.log(`Payload: ${JSON.stringify(request.payload)}`);
      console.log(`${request.info.remoteAddress}: ${request.method.toUpperCase()} ${request.url.path} --> ${request.response.statusCode}`);
    });
  }

  // Start the app
  const options = {};
  if (env.DEV) {
    options.force = true;
  }
  await models.sequelize.sync(options);
  await app.start();
  console.log(`Started. Running on ${app.info.uri}`);
};

init().catch(err => console.log(`Unexpected error ${err.message}\n`, err));
