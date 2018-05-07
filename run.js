const { init } = require('./');

init()
  .then(server => console.log(`Started. Running on ${server.info.uri}`))
  .catch(err => console.log(`Unexpected error ${err.message}\n`, err));
