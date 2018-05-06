const { init } = require('./');

init()
  .then((server) => {
    setTimeout(async () => {
      await server.stop();
      console.log("Server didn't crash");
      process.exit(0);
    }, 2000);
  })
  .catch((err) => { throw err; });
