const Modules = require('../client/modules');

module.exports = {
    name: 'delete',
    args: '',
	description: 'Permamently deleting status from your Discord server.',
	execute(message) {
        // permissions check
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        var baseEmbed = Modules.embed();

        // check guild doesn't have added server
        if (!Modules.manage.IsAlredyAdded(message.guild.id)) {
            baseEmbed = baseEmbed.setTitle("This guild didn't have added a FiveM server.");
            message.channel.send(baseEmbed);
            return;
        }

        // run collector
        const filter = m => m.author.id == message.author.id;
        const collector =  message.channel.createMessageCollector(filter, { time: 60000 });
        let response = false;

        baseEmbed = baseEmbed.setTitle(`Are you sure? Yes/No`);
        message.channel.send(baseEmbed);

        collector.on('collect', m => {
            response = true;
            if (m.content.toLowerCase() == 'yes') {
                Modules.manage.DeleteGuild(message.guild.id, message.channel);
            } else if (m.content.toLowerCase() == 'no') {
                baseEmbed = baseEmbed.setTitle('Aborted!');
                message.channel.send(baseEmbed);
            }
        });
        
        collector.on('end', m => {
            if (!response) {
                baseEmbed = baseEmbed.setTitle("You don't replay at this message. Closing collector!");
                message.channel.send(baseEmbed);
            }
        });
        
	}
};