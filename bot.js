var Discord = require("discord.js");

var simpleMessage = {
    "!commands" : "Memes: \n!feelsbadman \n!sneakyW \n!sneakyGasm \n!feelsbadmangun \n\nMessages: \n!justin \navu \n!top \n!meteos",
    "!feelsbadman" : "https://openclipart.org/image/2400px/svg_to_png/222252/feels.png",
    "!sneakyW" : "http://66.media.tumblr.com/avatar_a3d04f399583_128.png",
    "!sneakyw" : "http://66.media.tumblr.com/avatar_a3d04f399583_128.png",
    "!sneakyGasm" : "https://pbs.twimg.com/profile_images/738553087812632576/3IAFLww8.jpg",
    "!sneakygasm" : "https://pbs.twimg.com/profile_images/738553087812632576/3IAFLww8.jpg",
    "!feelsbadmangun" : "http://memesvault.com/wp-content/uploads/Feels-Bad-Man-Frog-Tumblr-21.jpg"
};

var ttsMessage = {
    "!justin" : "top kek m8",
    "avu" : "shut the fuck up",
    "!top" : "die",
    "!meteos" : "Fucking superstar jungler for cloud nine. Yeah 12.7 kda in the s3 summer split."
};

require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        console.log("\n\n\n")
        return;
    }
    var $ = require("jquery")(window);
    var bot = new Discord.Client();

    bot.on('ready', () => {
        console.log('I am ready!');
    });

    bot.on('message', (message) => {
        if(simpleMessage[message.content]) {
            message.channel.sendMessage(simpleMessage[message.content]);
        }
        else if(ttsMessage[message.content]) {
            message.channel.sendMessage(ttsMessage[message.content], {tts: true});
        }
        else if (message.content.startsWith("!game")) {
            var summName = message.content.substring(message.content.indexOf(" ")+1)
                           .replace(" ", "").toLowerCase().trim();
            var api_key = "RGAPI-C4F779BC-3FC7-4213-8728-E5A0B63E32B3";
            var summID;
            $.ajax({
                url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/'+ summName + '?api_key=' + api_key,
                type: 'GET',
                dataType: 'json',
                success: function (json) {
                    //console.log(json[summName].name);
                    //console.log(json[summName].id);
                    console.log(json);
                    summID = json[summName].id;
                    //console.log('https://na.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/' + summID + '?api_key=' + api_key);
                    $.ajax({
                        //url: 'https://na.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/' + summID + '?api_key=' + api_key,
                        url: 'https://na.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/21631024?api_key=RGAPI-C4F779BC-3FC7-4213-8728-E5A0B63E32B3',
                        type: 'GET',
                        dataType: 'json',
                        success: function (json) {
                            console.log("works?");
                            console.log(json);

                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            //console.log(textStatus);
                            console.log(errorThrown);
                            //console.log(XMLHttpRequest);
                            message.channel.sendMessage("Game not found");
                        }
                    });

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    message.channel.sendMessage("Summoner not found");
                }
            });
            
        }
    });
    bot.login("MjI1MTA2NTE4MTI1NTc2MjE0.CrkOhw.3vZXgSkx7X40tecfaIGrZUPOH5w");  
});