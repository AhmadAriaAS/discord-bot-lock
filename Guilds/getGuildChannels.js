module.exports = async (client, guild_id) => {
  const guild = await client.guilds.fetch(guild_id);

  let channels = [];

  guild.channels.cache
    .filter((channel) => channel.type === 0)
    .map((channel) => {
      channels.push({ name: channel.name, value: channel.id });
    });

  return channels;
};
