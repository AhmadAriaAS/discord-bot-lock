module.exports = (client, editor) => {
  setInterval(async () => {
    if (editor.get("Discord.User.guild.id") === "") return;
    const guild = await client.guilds.fetch(
      editor.get("Discord.User.guild.id")
    );

    let channel = await guild.channels.fetch(
      editor.get("Discord.User.guild.lock-channel.id")
    );

    let timeStart = editor.get(
      "Discord.User.guild.lock-channel.available-time.start"
    );
    let timeEnd = editor.get(
      "Discord.User.guild.lock-channel.available-time.end"
    );

    const Rawtime = new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Jakarta",
    });
    
    console.log(`${Rawtime}`);

    if (Rawtime == timeStart) {
      channel.permissionOverwrites.edit(`1014147463600406678`, {
        ViewChannel: true,
      });
      channel.send({content: `Channel <#${editor.get("Discord.User.guild.lock-channel.id")}> has been Enabled`})
      console.log(`Channel has been Enabled`)
    }
    if (Rawtime == timeEnd) {
      channel.permissionOverwrites.edit(`1014147463600406678`, {
        ViewChannel: false,
      });
      channel.send({content: `Channel <#${editor.get("Discord.User.guild.lock-channel.id")}> has been Disabled`})
      console.log(`Channel has been Disabled`)
    }
  }, 1000);
};
