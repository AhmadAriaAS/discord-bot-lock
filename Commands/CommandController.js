module.exports = (client, Editor, fetch) => {
  client.on("interactionCreate", (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    interaction.deferReply();

    const { commandName } = interaction;

    if (commandName == "lockchannel") {
      require("./LockChannel")(client, interaction, Editor);
    }
  });
};
