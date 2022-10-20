const itemData = require("../data/items.json");
const { default: xiv } = require("../utils/xiv.cjs");

const itemNameCache = Object.entries(itemData)
  .map(([k, v]) => ({ name: v.en, value: k }))
  .filter((entry) => entry.name.length > 0);

const autocompleteRoutes = {
  xiv: {
    item: (interaction) => {
      const itemName = interaction.options.getFocused(true).value;
      return itemNameCache
        .filter((choice) => choice.name.startsWith(itemName))
        .sort((a, b) => a.name.length - b.name.length)
        .slice(0, 25);
    },
  },
};

module.exports = {
  async handleAutocomplete(interaction) {
    baseCommandName = interaction.commandName;
    subcommandName = interaction.options.getSubcommand({ required: false });

    if (subcommandName) {
      await interaction.respond(
        autocompleteRoutes[baseCommandName][subcommandName](interaction)
      );
    } else {
      await interaction.respond(
        autocompleteRoutes[baseCommandName](interaction)
      );
    }
  },
};
