const Modules = require('../client/modules');

module.exports = {
    name: 'channel',
    args: '<#channel>',
	description: 'If status is alredy added allows to change chanel with status messeage.',
	execute(message, args) {
        // permissions check
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        if (!args[0]) return;
        var baseEmbed = Modules.embed();

        // check guild doesn't have added server
        if (!Modules.manage.IsAlredyAdded(message.guild.id)) {
            baseEmbed = baseEmbed.setTitle("This guild didn't have added a FiveM server.");
            message.channel.send(baseEmbed);
            return;
        }

        let channelID = Modules.channels.GetChannelId(args[0]);
        let channel = Modules.channels.GetChannelFromId(channelID, message.guild.id);
        channel.send('STATUS - WAIT FOR UPDATE!').then(m => {
            Modules.manage.ChangeChannel(message.guild.id, channelID, m.id, message.channel);
        });
        
	}
};