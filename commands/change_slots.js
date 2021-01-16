const fs = require('fs');
const path = require('path');
const Modules = require('../client/modules');

module.exports = {
    name: 'slots',
    args: '<NUMBER>',
	description: 'Allows to change ammout of yours server slots.',
	execute(message, args) {
        // permissions check
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        if (!args[0]) return;
        var baseEmbed = Modules.embed();

        // check guild doesn't have added server
        if (!Modules.manage.IsAlredyAdded(message.guild.id)) {
            baseEmbed = baseEmbed.setTitle("This guild didn't have added server.");
            message.channel.send(baseEmbed);
            return;
        }

        fs.readFile(path.join(__dirname, '../', 'guilds.json'), 'utf-8', (err, res) => {
            if (err) throw err;
            res = JSON.parse(res);
            res[message.guild.id.toString()].SLOTS = args[0].toString();
            fs.writeFile(path.join(__dirname, '../', 'guilds.json'), JSON.stringify(res), (err) => {
                if (err) {
                    throw err;
                } else {
                    Modules.print(`Succesfuly changed slots to ${args[0]} for guild ${message.guild.id}`, 'succesfull');
                    const baseEmbed = Modules.embed().setTitle(`Succesfuly changed slots.`);
                    message.channel.send(baseEmbed);
                }
            });
        });
	}
};