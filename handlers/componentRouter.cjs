const config = require("config");
const msg = require("../utils/msg.cjs");
const { ComponentType } = require("discord.js");
const { handleButton } = require("./handleButton.cjs");

component_routes = {
  Button: handleButton,
};

module.exports = {
  async handleComponent(interaction) {
    await component_routes[ComponentType[interaction.componentType]](
      interaction
    );
  },
};
