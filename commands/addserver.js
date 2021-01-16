const Modules = require('../client/modules');

module.exports = {
    name: 'add',
    args: '',
	description: 'Running collector that allow to add FiveM sever status.',
	execute(message) {
        // permissions check
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        var baseEmbed = Modules.embed();

        // check guild doesn't have added server
        if (Modules.manage.IsAlredyAdded(message.guild.id)) {
            baseEmbed = baseEmbed
                .setTitle("This guild alredy have added a FiveM server.");
            message.channel.send(baseEmbed);
            return;
        }

        // run collector
        let questions = [
            {
                'name': 'SERVER_ADDR',
                'question': 'Give your FiveM server address with port. EX. 54.37.129.92:30120',
                'replay': ''
            },
            {
                'name': 'CHANNEL_ID',
                'question': 'Set channel of your server status. EX. #general',
                'replay': ''
            },
            {
                'name': 'MESSAGE_ID',
                'question': '',
                'replay': ''
            }
        ];

        const filter = m => m.author.id == message.author.id;
        const collector =  message.channel.createMessageCollector(filter, { time: 60000 });
        let index = 0;

        baseEmbed = baseEmbed.setTitle(questions[index].question);
        message.channel.send(baseEmbed)

        collector.on('collect', m => {
            // get channel id from #
            if (index == 1) m.content = Modules.channels.GetChannelId(m.content);
            // set collected message to questions
            questions[index].replay = m.content;
            // go next step
            index++
            // check this is end
            if (index < questions.length - 1) {
                baseEmbed = baseEmbed.setTitle(questions[index].question);
                message.channel.send(baseEmbed);
            } else {
                // send message to channel
                let channel = Modules.channels.GetChannelFromId(questions[1].replay, message.guild.id)
                if (channel) {
                    channel.send('STATUS - WAIT FOR UPDATE!').then(m => {
                        questions[questions.length-1].replay = m.id;
                        Modules.manage.AddServerToJson(questions, message.guild.id, message.channel);
                    });
                } else {
                    baseEmbed = baseEmbed.setTitle("Wrong channel!");
                    message.channel.send(baseEmbed);
                    index--
                }

            }
        });
        
        collector.on('end', m => {
            if (!questions[questions.length-1].replay) {
                baseEmbed = baseEmbed.setTitle("You don't replay at this message. Closing collector!");
                message.channel.send(baseEmbed);
            }
        });
        
	}
};