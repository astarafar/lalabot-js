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
        .setCustomId("testbutton")
        .setLabel("Press me!")
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
      content: "Here's a test button for you. Only you can see this!",
      components: [row],
      ephemeral: true,
    });
  },
};
