const { Client, GatewayIntentBits, Guild } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageTyping,
  ],
  partials: ["CHANNEL"],
});

const JsonEditor = require("edit-json-file");
const fetch = require("node-fetch");

const dir = __dirname;

let Editor = JsonEditor(`${dir}/Configuration/config.json`);

// On Ready
client.on("ready", async (cl) => {
  console.log(`Connected to ${cl.user.tag}`);

  // const Rawtime = new Date().toLocaleTimeString("en-US", {
  //   timeZone: "Asia/Jakarta",
  // });
  // console.log(`${Rawtime}`);
});

// On Auto Complete
require("./CommandParameter/LockChannelParams")(client, Editor);

// On Command
require("./Commands/CommandController")(client, Editor, fetch);

// Login
client.login(Editor.get("Discord.bot.token"));

require("./CronJob/LockChannelCron")(client, Editor);
