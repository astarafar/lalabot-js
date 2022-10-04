const msg = require("../utils/msg.cjs");
const { InteractionType } = require("discord.js");
const { handleCommand } = require("../handlers/commands.cjs");
const { handleComponent } = require("../handlers/components.cjs");

interaction_routes = {
  ApplicationCommand: handleCommand,
  MessageComponent: handleComponent,
};

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    await interaction_routes[InteractionType[interaction.type]](interaction);
  },
};
