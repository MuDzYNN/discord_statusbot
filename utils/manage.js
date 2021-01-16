const fs = require('fs');
const path = require('path');
const Modules = require('../client/modules')

const IsAlredyAdded = (guildID) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'guilds.json'), {encoding:'utf-8'}));
    
    if (data[guildID.toString()]) {
        return true
    }

    return false
}

const changeServerIP = (newIP, guild, channel) => {
    fs.readFile(path.join(__dirname, '../', 'guilds.json'), 'utf-8', (err, res) => {
        if (err) throw err;
        res = JSON.parse(res);
        res[guild].SERVER_ADDR = newIP;
        fs.writeFile(path.join(__dirname, '../', 'guilds.json'), JSON.stringify(res), (err) => {
            if (err) {
                throw err;
            } else {
                Modules.status.updateData();
                Modules.print(`Succesfuly changed IP for guild ${guild}`, 'succesfull');
                const baseEmbed = Modules.embed().setTitle(`Succesfully changed IP to: ${newIP}!`);
                channel.send(baseEmbed);
            }
        });
    });
}

const AddServerToJson = (data, guild, channel) => {
    fs.readFile(path.join(__dirname, '../', 'guilds.json'), 'utf-8', (err, res) => {
        if (err) throw err;
        res = JSON.parse(res);
        res[guild] = {
            "SERVER_ADDR": data[0].replay,
            "CHANNEL_ID": data[1].replay,
            "MESSAGE_ID": data[2].replay,
            "SLOTS": "64"
        };
        fs.writeFile(path.join(__dirname, '../', 'guilds.json'), JSON.stringify(res), (err) => {
            if (err) {
                throw err;
            } else {
                Modules.status.updateData();
                Modules.print(`Succesfuly added server for guild ${guild}`, 'succesfull');
                const baseEmbed = Modules.embed().setTitle('Succesfully added status!');
                channel.send(baseEmbed);
            }
        });
    });
}

const DeleteGuild = (guildID, channel) => {
    fs.readFile(path.join(__dirname, '../', 'guilds.json'), 'utf-8', (err, res) => {
        if (err) throw err;
        res = JSON.parse(res);
        res[guildID] = undefined;
        fs.writeFile(path.join(__dirname, '../', 'guilds.json'), JSON.stringify(res), (err) => {
            if (err) {
                throw err;
            } else {
                Modules.status.updateData();
                Modules.print(`Succesfuly deleted server for guild ${guildID}`, 'succesfull');
                const baseEmbed = Modules.embed().setTitle('Succesfully deleted status!');
                channel.send(baseEmbed);
            }
        });
    });
}

const ChangeChannel = (guildID, channelID, messageID, channel) => {
    fs.readFile(path.join(__dirname, '../', 'guilds.json'), 'utf-8', (err, res) => {
        if (err) throw err;
        res = JSON.parse(res);
        res[guildID].CHANNEL_ID = channelID;
        res[guildID].MESSAGE_ID = messageID;
        fs.writeFile(path.join(__dirname, '../', 'guilds.json'), JSON.stringify(res), (err) => {
            if (err) {
                throw err;
            } else {
                Modules.status.updateData();
                Modules.print(`Succesfuly changed status channel for guild ${guildID}`, 'succesfull');
                const baseEmbed = Modules.embed().setTitle('Succesfully changed status channel!');
                channel.send(baseEmbed);
            }
        });
    });
}

exports.AddServerToJson = AddServerToJson;
exports.IsAlredyAdded = IsAlredyAdded;
exports.changeServerIP = changeServerIP;
exports.DeleteGuild = DeleteGuild;
exports.ChangeChannel = ChangeChannel;