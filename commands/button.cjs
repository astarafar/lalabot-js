const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("button")
    .setDescription("Creates a ping button."),
  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("ping")
        .setLabel("Ping!")
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
      content: "Here's a test button for you.",
      components: [row],
      ephemeral: true,
    });
  },
};
