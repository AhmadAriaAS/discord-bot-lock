module.exports = (client, editor) => {
  const { InteractionType } = require("discord.js");

  client.on("interactionCreate", async (interaction) => {
    if (interaction.type !== InteractionType.ApplicationCommandAutocomplete)
      return;

    if (interaction.commandName === "lockchannel") {
      const focusedOption = interaction.options.getFocused(true);

      const channelz = await require("../Guilds/getGuildChannels")(
        client,
        interaction.guildId
      );

      if (focusedOption.name == "channel") {
        let corpedChoice = [];

        if (focusedOption.name)
          channelz.forEach((rows) => {
            if (corpedChoice.length >= 25) return;
            corpedChoice.push({ name: rows.name, value: rows.value });
          });

        const filtered = channelz.filter((row) =>
          row.name.includes(focusedOption.value)
        );

        // console.log(focusedOption.value.length);
        // console.log(filtered);
        if (focusedOption.value === "") {
          await interaction.respond(corpedChoice);
        }
        if (focusedOption.value.length >= 4) {
          await interaction.respond(filtered);
        }
      }
    }
  });
};
