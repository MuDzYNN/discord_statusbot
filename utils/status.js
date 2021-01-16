const fs = require('fs');
const path = require('path');
const client = require('../client/client');
const axios = require('axios');
const Modules = require('../client/modules');
const { CONNREFUSED } = require('dns');

let loop, data;

const getServerData = async (ip) => {
	try {
		return axios.get(`http://${ip}/players.json`, { responseType: 'json', timeout: 10000 });
	} catch(e) {
		return e;
	}
};

const updateData = () => {
    data = JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'guilds.json'), 'utf-8'));
}

const startLooping = () => {
    updateData();
    loop = setInterval(() => {
        for (guild in data) {
            updateStatusEmbed(guild, data[guild]);
        }
    }, 2000);
}

const processPlayersData = (data, embed, index) => {
    if (!index) index = 0;
    
    embed = embed.addField('Players', '-\n');

    for (player in data) {
        if (player > index) {
            embed.fields[embed.fields.length-1].value += `${index+1}. ${data[player].name} [PING: ${data[player].ping}]\n`;
            index++;
            if (embed.fields[embed.fields.length-1].value.length >= 900 && player < data.length) {
                processPlayersData(data, embed, index);
            }
            if (player == data.length-1) {
                return embed;
            }
        }
    }
}

const updateStatusEmbed = async (guild, data) => {
    let channel = client.guilds.cache.get(guild).channels.cache.get(data.CHANNEL_ID);
    let baseEmbed = Modules.embed();

    await getServerData(data.SERVER_ADDR).then(players => {
        baseEmbed = processPlayersData(players.data, baseEmbed).setTitle(`STATUS: ONLINE [🟢]\nOnline: ${players.data.length}/${data.SLOTS}`);
        channel.messages.fetch({around: data.MESSAGE_ID, limit: 1}).then(message => {
            message.first().edit(baseEmbed);
        });
    }).catch(err => {
        if (err.code) {
            if (err.code == 'ECONNREFUSED') {
                baseEmbed = baseEmbed.setTitle(`STATUS: OFFLINE [🔴]`)
            } else {
                baseEmbed = baseEmbed.setTitle(`Something went wrong! Error code: ${err.code}`)
            }
            channel.messages.fetch({around: data.MESSAGE_ID, limit: 1}).then(message => {
                message.first().edit(baseEmbed);
            });
        }
    });
}

exports.startLooping = startLooping;
exports.updateData = updateData;