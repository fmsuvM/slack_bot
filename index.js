//slack botokit using by Botkit & JavaScript


var bt = require('botkit');
var controller = bt.slackbot({
    debug: false
});
controller.spawn({
    token: 'XXXXXXXXXXXXXXXXX'
}).startRTM();

controller.on('bot_channel_join', function(bot, message){
    bot.reply(message, 'Thank you!');
});
