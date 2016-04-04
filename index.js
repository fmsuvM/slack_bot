//slack botokit using by Botkit & JavaScript

//token
var key = '';

var bt = require('botkit');//botkit 使う

var reg = / /;

//tokenが空の場合
if(key === ''){
    console.log('Error: Not token');
    process.exit(1);
}

var controller = bt.slackbot({
    debug: false, //debugは最初false, 複雑担ってきたらtrue
});

controller.spawn({
    token: key //token設定
}).startRTM(function(err){
    if(err){//error処理
        throw new console.error(err);
    }
});//startRTMでbot起動

//convo使う
controller.hears(
    'お話ししよう',
    'direct_mention',
    function(bot, message){
        console.log(message);
        bot.startConversation(
            message,
            function(err, convo){
                console.log(convo);
                convo.say('Hello!!');
                convo.say('会話してやるぜ〜〜');
            }
        );
    }
);

/*
//event handlerはon()かhear(). どっちかに統一した方がいいかも
//個人的にはhears. 何か「聴いてる」感が欲しい
controller.hears('bot_channel_join', function(bot, message){
    return bot.reply(message, 'Thank you!');
});

controller.hears('hey you', ['direct_mention'], function(bot,message){
    console.log(message);
    //console.log(bot);
    return bot.reply(message, 'ｳｪｲｿｲﾔ');
});
*/
