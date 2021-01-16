const Modules = require('../client/modules');
const client = require('../client/client');

module.exports = {
    name: 'help',
    args: '',
	description: 'This message :)',
	execute(message) {
        // permissions check
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        var baseEmbed = Modules.embed();

        client.commands.forEach(command => {
            baseEmbed.addField(`${Modules.config.PREFIX}${command.name} ${command.args}`, command.description);
        });
        
        message.channel.send(baseEmbed);
	}
};