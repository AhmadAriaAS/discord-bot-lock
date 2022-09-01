const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const JsonEditor = require("edit-json-file");
const dir = __dirname;
let Editor = JsonEditor(`${dir}/Configuration/config.json`);

const commands = [
  new SlashCommandBuilder()
    .setName("lockchannel")
    .setDescription("Lock a Channel on Discord")
    .addStringOption((option) =>
      option
        .setName("channel")
        .setDescription("The Channel ID of the channel lock")
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addStringOption((option) =>
      option
        .setName("start")
        .setDescription(
          "Start of available time with format [H:MM:SS PM/AM] without sparator"
        )
        .setRequired(true)
        .setAutocomplete(false)
    )
    .addStringOption((option) =>
      option
        .setName("end")
        .setDescription(
          "End of available time with format [H:MM:SS PM/AM] without sparator"
        )
        .setRequired(true)
        .setAutocomplete(false)
    ),
];

const rest = new REST({ version: "10" }).setToken(
  Editor.get("Discord.bot.token")
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(
        Editor.get("Discord.bot.app_id"),
        Editor.get("Discord.User.guild.id")
      ),
      { body: commands }
    );
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
