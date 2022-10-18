const { InteractionType } = require("discord.js");
const { handleCommand } = require("../handlers/commands.cjs");
const { handleComponent } = require("../handlers/components.cjs");

const interactionRoutes = {
  ApplicationCommand: handleCommand,
  MessageComponent: handleComponent,
};

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    await interactionRoutes[InteractionType[interaction.type]](interaction);
  },
};
