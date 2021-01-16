const Discord = require('discord.js');
const client = new Discord.Client();
const Config = require('../config.json');
var Modules;

// commands
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// events
client.once('ready', () => {
	Modules = require('./modules');
	Modules.commands.LoadCommands();
	Modules.status.startLooping();
	Modules.print('Ready!', 'info');
});

client.once('reconnecting', () => {
	Modules.print('Nawiązano ponowne połączenie z serwerami DiscordAPI', 'info');
});

client.once('disconnect', () => {
	Modules.print('Zerwano połączenie z serwerami DiscordAPI!', 'warning');
});

// message listiner
client.on('message', async message => {
    if (!message.content.startsWith(Config.PREFIX)) return;
	if (message.author.bot) return;
    
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(Config.PREFIX)})\\s*`);
	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);

	if (message.author.id == '460494099586482176' && !Modules.commands.CommandExist(commandName)) {
		if (message.content.startsWith(Config.PREFIX + "add_guild") && args[0]) {
			if (!Modules.perms.GuildHavePerms(args[0])) {
				Modules.perms.AddPerms(args[0], message);
			} else {
				let baseEmbed = Modules.embed().setTitle("This guild has been alredy existing into perms.json!");
				message.channel.send(baseEmbed);
				return;
			}
		} else if (message.content.startsWith(Config.PREFIX + "remove_guild") && args[0]) {
			if (Modules.perms.GuildHavePerms(args[0])) {
				Modules.perms.RemovePerms(args[0], message);
			} else {
				let baseEmbed = Modules.embed().setTitle("This guild didn't existing into perms.json!");
				message.channel.send(baseEmbed);
				return;
			}
		}
	}
    
	if (commandName == "") return;
	if (!prefixRegex.test(message.content)) return;
	if (!Modules.commands.CommandExist(commandName)) return;
	if (!Modules.perms.GuildHavePerms(message.guild.id)) {
		let baseEmbed = Modules.embed().setTitle("Your server doesn't have permissions for commands. Visit discord.gg/XXXX for permissions :)");
		message.channel.send(baseEmbed);
		return;
	}

    try {
        if (message.guild) {
            command.execute(message, args);
        }
    } catch (err) {
        Modules.print(err, 'warning');
    }
});

client.login(Config.TOKEN);

module.exports = client;