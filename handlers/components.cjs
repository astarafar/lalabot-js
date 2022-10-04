const { ComponentType } = require("discord.js");

componentRoutes = {
  Button: handleButton,
};

button_routes = {
  ping: async (interaction) => {
    await interaction.reply({
      content: `You pressed the \`${interaction.customId}\` button!`,
      ephemeral: true,
    });
  },
};

async function handleButton(interaction) {
  await button_routes[interaction.customId](interaction);
}

module.exports = {
  async handleComponent(interaction) {
    await componentRoutes[ComponentType[interaction.componentType]](
      interaction
    );
  },
};
