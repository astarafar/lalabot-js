const msg = require("../utils/msg.cjs");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(msg.info(`Ready! Logged in as ${client.user.tag}.`));
  },
};
