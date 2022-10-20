const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const xiv = require("../utils/xiv.cjs");

const xivRoutes = {
  item: searchItem,
};

async function searchItem(interaction) {
  await interaction.deferReply({ ephemeral: true });

  const queryString = interaction.options.getString("item_name");

  xiv
    .getItemData(queryString)
    .then(async (result) => {
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle(result.name)
            .setThumbnail(result.icon)
            .setDescription(result.description),
        ],
        ephemeral: true,
      });
    })
    .catch(async (err) => {
      await interaction.editReply({
        content: err.message,
        ephemeral: true,
      });
    });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("xiv")
    .setDescription("Search in-game data structures.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("item")
        .setDescription("Get data about an item.")
        .addStringOption((option) =>
          option
            .setName("item_name")
            .setDescription("Item name to search for.")
            .setRequired(true)
            .setAutocomplete(true)
        )
        .addBooleanOption((option) =>
          option
            .setName("exact_match")
            .setDescription("Match only the exact item name.")
        )
    ),
  async execute(interaction) {
    await xivRoutes[interaction.options.getSubcommand()](interaction);
  },
};
