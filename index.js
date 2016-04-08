//slack botokit using by Botkit & JavaScript

//token
var key = '';

var bt = require('botkit'); //botkit 使う

var reg = / /;

//tokenが空の場合
if (key === '') {
    console.log('Error: Not token');
    process.exit(1);
}

var controller = bt.slackbot({
    debug: false, //debugは最初false, 複雑担ってきたらtrue
});

controller.spawn({
    token: key //token設定
}).startRTM(function(err) {
    if (err) { //error処理
        throw new console.error(err);
    }
}); //startRTMでbot起動

//convo使う
controller.hears('How are you?', 'direct_mention', function(bot, message) {
    console.log('hears message log');
    //console.log(message); //出力
    bot.startConversation(message, function(err, convo) {
        console.log('conversation message log');
        console.log(message); //出力 = 上のmessageと同じ
        console.log('conversation convo log');
        console.log(convo); //出力

        convo.say('Hello!!');
        convo.say('I\'m hungry.');

        console.log('new bot log');
        //上とは別物っぽい?
        var message_with_attachments = {
            'user name': 'tkd_bot',
            'text': 'This message is test.',
            'attachments': [{
                'fallback': 'contents 1.',
                'title': 'contents 2',
                'text': ' contents 3',
                'color': '#7CD197'
            }],
            'icon_url': 'http://lorempixel.com/48/48'
        };

        convo.say(message_with_attachments);


    });
});

/*
controller.hears('bot_channel_join', function(bot, message){
    return bot.reply(message, 'Thank you!');
});

controller.hears('hey you', ['direct_mention'], function(bot,message){
    console.log(message);
    //console.log(bot);
    return bot.reply(message, 'ｳｪｲｿｲﾔ');
});
*/
