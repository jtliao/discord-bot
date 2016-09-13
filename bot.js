
var Discord = require("discord.js");
var bot = new Discord.Client();

bot.on("message", msg => {
    if (msg.content === "avu") {
        msg.channel.sendMessage("shut the fuck up avu");
    }
});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login("MjI1MTA2NTE4MTI1NTc2MjE0.CrkOhw.3vZXgSkx7X40tecfaIGrZUPOH5w");