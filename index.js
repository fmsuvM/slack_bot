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

//functin形式にして実装. 引数増やすのありかも
controller.hears('こんにちは', ['direct_mention', 'ambient'], function(bot, message) {
    bot.startConversation(message, qTime);
});

var qTime = function(response, convo) {
    convo.say('こんにちは!!');
    convo.ask('今何をしていますか?', function(response, convo) {
        convo.say('なるほどなるほど');
        answerTime(response, convo);
        convo.next();
    });
};

var answerTime = function(response, convo) {
    convo.ask('次は何をする予定ですか?', function(response, convo) {
        convo.ask('いいですね!!');
        lastQuestin(response, convo);
        convo.next();
    });
};

var lastQuestin = function(response, convo) {
    convo.ask('明日も大学には行くんですか?', [{
        pattern: 'はい',
        callback: function(response, convo) {
            convo.say('なるほど. 大学で進捗を出してくださいね!');
            convo.next();
        }
    }, {
        pattern: 'いいえ',
        callback: function(response, convo) {
            convo.say('では家で進捗を出しましょう!');
            convo.next();
        }
    }, {
        default: true,
        callback: function(response, convo) {
            convo.say('ではよしなに');
            convo.repeat();
            convo.next();
        }
    }]);
};

//console.log('new bot log');
//use_nameとfallback以外反応してる.
//これの公式referenceよもう
/*
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
*/

//convo.say(message_with_attachments);
