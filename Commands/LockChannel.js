module.exports = async (client, interaction, editor) => {
  const { PermissionsBitField } = require("discord.js");
  const flag = [
    PermissionsBitField.Flags.ViewChannel
  ]

  const wait = require("node:timers/promises").setTimeout;
  await wait(2000);

  const guild = await client.guilds.fetch(editor.get('Discord.User.guild.id'));
  const channelDir = await guild.channels.fetch(
    interaction.options.getString("channel")
  );

  channelDir.permissionOverwrites.edit(
    `1014147463600406678`, {
    ViewChannel: false
  })

  editor.set('Discord.User.guild.lock-channel.id',interaction.options.getString("channel"))
  editor.set('Discord.User.guild.lock-channel.available-time.start',interaction.options.getString("start"))
  editor.set('Discord.User.guild.lock-channel.available-time.end',interaction.options.getString("end"))

  editor.save()

  await wait(1000)
  
  return await interaction.editReply({
    ephemeral: true,
    content: `<@&1014147463600406678> Lock Channel has been set to <#${interaction.options.getString("channel")}> start on ${interaction.options.getString("start")} and end on ${interaction.options.getString("end")}`,
  });
};
