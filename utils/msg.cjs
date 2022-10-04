const colors = require("colors/safe");

module.exports = {
  ok(message) {
    return (
      colors.cyan("[   ") +
      colors.green("OK") +
      colors.cyan("   ] ") +
      colors.white(message)
    );
  },
  fail(message) {
    return (
      colors.cyan("[  ") +
      colors.red("FAIL") +
      colors.cyan("  ] ") +
      colors.white(message)
    );
  },
  info(message) {
    return (
      colors.cyan("[  ") +
      colors.yellow("INFO") +
      colors.cyan("  ] ") +
      colors.white(message)
    );
  },
};
