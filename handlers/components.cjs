const { ComponentType } = require("discord.js");

componentRoutes = {
  Button: handleButton,
};

buttonRoutes = {
  event: async (interaction) => {},
  testbutton: async (interaction) => {
    interaction.reply({
      content: `You pressed the \`${interaction.customId}\` button! As before, only you can see this.`,
      ephemeral: true,
    });
  },
};

async function handleButton(interaction) {
  buttonRoutes[interaction.customId.split(":")[0]](interaction);
}

module.exports = {
  async handleComponent(interaction) {
    componentRoutes[ComponentType[interaction.componentType]](interaction);
  },
};
