const client = require("../client/client");

const GetChannelId = (channel) => {
    channel = channel.replace('<', '');
    channel = channel.replace('#', '');
    channel = channel.replace('>', '');

    return channel
}

const GetChannelFromId = (channelID, guild) => {
    return client.guilds.cache.get(guild).channels.cache.get(channelID);
}

exports.GetChannelId = GetChannelId;
exports.GetChannelFromId = GetChannelFromId;