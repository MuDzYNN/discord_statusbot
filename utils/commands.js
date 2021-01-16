const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const client = require('../client/client');


// registering commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));

const LoadCommands = () => {
	for (const file of commandFiles) {
		const command = require(path.join(__dirname, '../commands', file));
		client.commands.set(command.name, command);
	}
}

const CommandExist = (commandName) => {
    for (command of client.commands) {
        if (command[1].name == commandName) {
            return true
        }
    }
    return false
}

exports.LoadCommands = LoadCommands;
exports.CommandExist = CommandExist;