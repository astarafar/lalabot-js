button_routes = {
  ping: async (interaction) => {
    await interaction.reply({
      content: `You pressed the \`${interaction.customId}\` button!`,
      ephemeral: true,
    });
  },
};

module.exports = {
  async handleButton(interaction) {
    await button_routes[interaction.customId](interaction);
  },
};
