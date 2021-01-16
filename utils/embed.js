const Discord = require('discord.js');

const getBaseEmbed = () => {
    const baseEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTimestamp()
        .setFooter('Powered by MuDzYn.');

    return baseEmbed;
}

module.exports = getBaseEmbed;