const Modules = require('../client/modules');

module.exports = {
    name: 'ip',
    args: '<IP:PORT>',
	description: 'If status is alredy added allows to change your address of your server.',
	execute(message, args) {
        // permissions check
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        var baseEmbed = Modules.embed();

        if (args[0]) {
            Modules.manage.changeServerIP(args[0], message.guild.id, message.channel);
        } else {
            baseEmbed = baseEmbed.setTitle("You didn't specify your server IP.");
            message.channel.send(baseEmbed);
        }
       
	}
};