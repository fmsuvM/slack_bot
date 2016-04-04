//slack botokit using by Botkit & JavaScript

//token
var key = '';

var bt = require('botkit');//botkit 使う

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

//event handlerはon()かhear(). どっちかに統一した方がいいかも
//個人的にはhears. 何か「聴いてる」感が欲しい
controller.on('bot_channel_join', function(bot, message){
    return bot.reply(message, 'Thank you!');
});

controller.hears('hey you', ['direct_mention'], function(bot,message){
    return bot.reply(message, 'ｳｪｲｿｲﾔ');
});
