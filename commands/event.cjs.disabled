const db = require("../utils/db.cjs");
const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const eventRoutes = {
  create: createEvent,
};

async function createEvent(interaction) {
  interaction.deferReply({ ephemeral: true }).then((replyMsg) => {
    db.createEvent(
      replyMsg.id,
      interaction.options.getInteger("party_size") ?? 8,
      interaction.options.getInteger("tanks") ?? 2,
      interaction.options.getInteger("healers") ?? 2,
      interaction.options.getInteger("dps") ?? 4,
      interaction.options.getInteger("open") ?? 0
    );

    const row = new ActionRowBuilder().addComponents([
      new ButtonBuilder()
        .setCustomId(`event:${replyMsg.id}:tank`)
        .setLabel("Tank")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("1012541569791963156"),
      new ButtonBuilder()
        .setCustomId(`event:${replyMsg.id}:healer`)
        .setLabel("Healer")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("1012541555673935872"),
      new ButtonBuilder()
        .setCustomId(`event:${replyMsg.id}:dps`)
        .setLabel("DPS")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("1012541550649147432"),
    ]);

    interaction.editReply({
      content: "Here's some buttons.",
      components: [row],
      ephemeral: true,
    });
  });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("event")
    .setDescription("Manage events.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("create")
        .setDescription("Create a new event.")
        .addIntegerOption((option) =>
          option
            .setName("party_size")
            .setDescription("Maximum total party size.")
            .setMinValue(2)
            .setMaxValue(8)
        )
        .addIntegerOption((option) =>
          option
            .setName("tanks")
            .setDescription("Maximum allowed number of tanks.")
        )
        .addIntegerOption((option) =>
          option
            .setName("healers")
            .setDescription("Maximum allowed number of healers.")
        )
        .addIntegerOption((option) =>
          option
            .setName("dps")
            .setDescription("Maximum allowed number of DPS players.")
        )
        .addIntegerOption((option) =>
          option
            .setName("open")
            .setDescription("Maximum allowed number of role-flexible players.")
        )
    ),
  async execute(interaction) {
    await eventRoutes[interaction.options.getSubcommand()](interaction);
  },
};
