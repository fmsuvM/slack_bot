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
    convo.ask('こんにちは!', function(response, convo) {
        convo.say('今何をしていますか?');
        answerTime(response, convo);
        convo.next();
    });
};

var answerTime = function(response, convo) {
    convo.ask('なるほど', function(response, convo) {
        convo.ask('次は何する予定ですか?');
        lastQuestin(response, convo);
        convo.next();
    });
};

var lastQuestin = function(response, convo) {
    convo.ask('そうですか. 頑張ってください!!', function(response, convo) {
        convo.ask('明日も大学行こう!!');
        convo.next();
    });
};

//convo使う
var bigFunc = function() {
    controller.hears('How are you?', 'direct_mention', function(bot, message) {
        console.log('hears message log');
        //console.log(message); //出力
        bot.startConversation(message, function(err, convo) {
            console.log('conversation message log');
            //console.log(message); //出力 = 上のmessageと同じ
            console.log('conversation convo log');
            //console.log(convo); //出力

            convo.say('Hello!!');
            convo.say('I\'m hungry.');

            convo.ask('Are you hungry?', [{
                pattern: 'No problem', //patterのところに任意の文字列を挿入可能. 正規表現使う
                callback: function(response, convo) {
                    convo.say('最高');
                    convo.next();
                }
            }, {
                pattern: bot.utterances.yes,
                callback: function(response, convo) {
                    convo.say('Oh...');
                    convo.next();
                }
            }, {
                pattern: bot.utterances.no,
                callback: function(response, convo) {
                    convo.say('That\'s good.');
                    convo.next();
                }
            }, {
                default: true,
                callback: function(response, convo) {
                    convo.say('Ok. Have a nice day.');
                    convo.repeat();
                    convo.next();
                }
            }]);

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


        });
    });
};
