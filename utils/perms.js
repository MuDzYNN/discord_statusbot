const fs = require('fs');
const path = require('path');
const Modules = require('../client/modules');

const GuildHavePerms = (guildID) => {
    let res = JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'perms.json'), 'utf-8'));

    for (guild of res) {
        if (guildID == guild) {
            return true
        }
    }

    return false
}

const AddPerms = (guildID, message) => {
    fs.readFile(path.join(__dirname, '../', 'perms.json'), 'utf-8', (err, data) => {
        if (err) throw err;
        let res = JSON.parse(data);

        res.push(guildID.toString());

        fs.writeFile(path.join(__dirname, '../', 'perms.json'), JSON.stringify(res), (err) => {
            if (err) {
                throw err;
            } else {
                Modules.print(`Succesfuly added guild with ID ${guildID} to perms.json`, 'succesfull');
                const baseEmbed = Modules.embed().setTitle(`Succesfuly added guild with ID ${guildID} to perms.json`);
                message.channel.send(baseEmbed);
            }
        });
    });
}

const RemovePerms = (guildID, message) => {
    fs.readFile(path.join(__dirname, '../', 'perms.json'), 'utf-8', (err, data) => {
        if (err) throw err;
        let res = JSON.parse(data);

        for (let i = 0; i < res.length; i++){ 
            if (res[i] == guildID) { 
                res.splice(i, 1); 
            }
        }

        fs.writeFile(path.join(__dirname, '../', 'perms.json'), JSON.stringify(res), (err) => {
            if (err) {
                throw err;
            } else {
                Modules.print(`Succesfuly removed guild with ID ${guildID} to perms.json`, 'succesfull');
                const baseEmbed = Modules.embed().setTitle(`Succesfuly removed guild with ID ${guildID} to perms.json`);
                message.channel.send(baseEmbed);
                Modules.manage.DeleteGuild(guildID, message.channel);
            }
        });
    });
}

exports.AddPerms = AddPerms;
exports.GuildHavePerms = GuildHavePerms;
exports.RemovePerms = RemovePerms;