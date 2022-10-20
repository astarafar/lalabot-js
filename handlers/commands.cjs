const msg = require("../utils/msg.cjs");
const { InteractionType } = require("discord.js");

const commandRoutes = {
  ApplicationCommand: handleApplicationCommand,
};

async function handleApplicationCommand(interaction) {
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    user = interaction.member.user;
    console.log(
      msg.warning(
        `${user.username}#${user.discriminator} (#${user.id}) issued command [${interaction.commandName}], which is deployed but has no registered handler.`
      )
    );

    await interaction.reply({
      content: "That command is registered but has not yet been implemented.",
      ephemeral: true,
    });
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(msg.error(error));
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
}

module.exports = {
  async handleApplicationCommand(interaction) {
    await commandRoutes[InteractionType[interaction.type]](interaction);
  },
};
