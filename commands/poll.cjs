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

const createEventRoutes = {
  anonymous: createAnonymousEvent,
};

async function createAnonymousEvent(interaction) {
  await interaction.deferReply({ ephemeral: true }).then(async (replyMsg) => {
    const choices = new Array();

    for (let i = 1; i <= 10; i++) {
      const thisOption = interaction.option.getString(`response_${i}`);

      if (thisOption) {
        choices.push(thisOption);
      }
    }

    const rows = new Array();

    for (let rowIndex = 0; rowIndex < Math.ceil(choices.length / 5); i++) {
      const elements = new Array();

      choices.slice(5 * rowIndex, 5 * rowIndex + 5).forEach((choice) => {
        elements.push(
          new ButtonBuilder()
            .setCustomId(
              `poll:${replyMsg.id}:${choice.replace(/[A-Za-z]/g, "")}`
            )
            .setLabel(choice)
            .setStyle(ButtonStyle.Primary)
        );
      });

      rows.push(new ActionRowBuilder(elements));

      await replyMsg.edit({
        content: interaction.option.getString("question"),
        components: rows,
        ephemeral: false,
      });
    }
  });
}

async function createEvent(interaction) {
  await createEventRoutes[
    interaction.option.getSubcommand().option.getSubcommand()
  ](interaction);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("devpoll")
    .setDescription("Create and manage polls.")
    .addSubcommandGroup((group) =>
      group
        .setName("create")
        .setDescription("Create a new poll.")
        .addSubcommand((subcommand) => {
          subcommand
            .setName("anonymous")
            .setDescription("Create an anonymous poll.")
            .addStringOption((option) =>
              option
                .setName("question")
                .setDescription("The question being asked.")
                .setRequired(true)
            );

          ordinals = [
            "first",
            "second",
            "third",
            "fourth",
            "fifth",
            "sixth",
            "seventh",
            "eighth",
            "ninth",
            "tenth",
            "eleventh",
            "twelfth",
            "thirteenth",
            "fourteenth",
            "fifteenth",
            "sixteenth",
            "seventeenth",
            "eighteenth",
            "nineteenth",
            "twentieth",
          ];

          for (let i = 1; i <= 20; i++) {
            subcommand.addStringOption((option) => {
              option
                .setName(`response_${i}`)
                .setDescription(`The ${ordinals[i]} choice.`);

              if (i == 1 || i == 2) {
                option.setRequired(true);
              }
            });
          }
        })
    ),
  async execute(interaction) {
    await eventRoutes[interaction.options.getSubcommand()](interaction);
  },
};
