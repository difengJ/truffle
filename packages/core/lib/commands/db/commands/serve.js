const command = {
  command: "serve",
  description: "Start Truffle's GraphQL UI playground",
  builder: {},
  help: {
    usage: "truffle db serve",
    options: []
  },

  /* This command does starts an express derived server that invokes
   * `process.exit()` on SIGINT. As a result there is no need to invoke
   * truffle's own `process.exit()` which is triggered by invoking the `done`
   * callback.
   *
   * Todo: blacklist this command for REPLs
   */
  run: async function(argv) {
    const Config = require("@truffle/config");
    const { playgroundServer } = require("@truffle/db");

    const config = Config.detect(argv);
    const port = (config.db && config.db.port) || 4444;

    const { url } = await playgroundServer(config).listen({ port });

    console.log(`🚀 Playground listening at ${url}`);
    console.log(`ℹ  Press Ctrl-C to exit`);
  }
};

module.exports = command;