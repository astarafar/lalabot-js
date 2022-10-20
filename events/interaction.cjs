const { InteractionType } = require("discord.js");
const { handleApplicationCommand } = require("../handlers/commands.cjs");
const { handleComponent } = require("../handlers/components.cjs");
const { handleAutocomplete } = require("../handlers/autocomplete.cjs");

const interactionRoutes = {
  ApplicationCommand: handleApplicationCommand,
  MessageComponent: handleComponent,
  ApplicationCommandAutocomplete: handleAutocomplete,
};

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    await interactionRoutes[InteractionType[interaction.type]](interaction);
  },
};
