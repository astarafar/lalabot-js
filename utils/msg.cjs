const colors = require("colors/safe");

module.exports = {
  emerg(msg) {
    return `${colors.red(colors.bold("EMERG".padStart(8)))}: ${msg}`
  },
  alert(msg) {
    return `${colors.red(colors.bold("ALERT".padStart(8)))}: ${msg}`
  },
  critical(msg) {
    return `${colors.red("CRITICAL".padStart(8))}: ${msg}`
  },
  error(msg) {
    return `${colors.red("ERROR".padStart(8))}: ${msg}`
  },
  warning(msg) {
    return `${colors.yellow("WARNING".padStart(8))}: ${msg}`
  },
  notice(msg) {
    return `${colors.yellow("NOTICE".padStart(8))}: ${msg}`
  },
  info(msg) {
    return `${colors.white("INFO".padStart(8))}: ${msg}`
  },
  debug(msg) {
    return `${colors.gray("DEBUG".padStart(8))}: ${msg}`
  }
};
