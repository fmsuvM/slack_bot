//slack botokit using by Botkit & JavaScript
(function() {
    var keyS = 'xoxb-31307312016-caph7L7wKlvgtuyl87wP3X6e'; //slack token
    var keyY = 'AIzaSyDMLDZrszREBDjPDSe3iMLgNWB33R2wBIc'; //youtube token


    var bt = require('botkit'); //using botkit
    var Youtube = require('youtube-node'); //using youtube-node
    var open = require('open'); // using open
    //case slack token is empty.
    if (keyS === '') {
        console.log('Error: Not token');
        process.exit(1);
    }

    //using youtube api
    var youtube = new Youtube();
    youtube.setKey(keyY);

    var controller = bt.slackbot({
        debug: false, //true or false. case true is realtime debug
    });


    controller.spawn({
        token: keyS //using slack token
    }).startRTM(function(err) {
        if (err) { //case error
            throw new console.error(err);
        }
    }); //bot open

    //alomost using [say] command.
    //using function. various talking

    //search google scholor
    controller.hears('論文読みたい', ['direct_mention', 'ambient'], function(bot, message) {
        bot.startConversation(message, ron_boon);
        console.log('論文読むぞ!!');
    });

    var ron_boon = function(response, convo) {
        var word;
        convo.say('論文か〜〜');
        convo.ask('何読みたい?', function(response, convo) {
            console.log('論文検索');
            word = response.text;
            convo.say('おk');
            searchScholor(word);
            convo.next();
        });
    };

    var searchScholor = function(word) {
        open('https://scholar.google.co.jp/scholar?q=' + word);
    };

    //search youtube
    controller.hears('動画見たい', ['direct_mention', 'ambient'], function(bot, message) {
        bot.startConversation(message, yFuncStarter);
        console.log('youtube search starting!!');
    });

    var yFuncStarter = function(response, convo) {
        var word = 'anime';
        convo.say('動画か〜〜');
        youtube.addParam('type', 'video');
        convo.ask('何が見たい?', function(response, convo) {
            console.log('First Question');
            console.log(response.text);
            word = response.text;
            convo.say('そうかそうか');
            searchNumber(response, convo, word);
            convo.next();
        });
    };

    var searchNumber = function(response, convo, word) {
        var number;
        convo.ask('何件検索する?', function(response, convo) {
            console.log('Second Question');
            console.log(response.text);
            number = response.text;
            convo.say(response.text + '件ね. おk');
            searchDetail(response, convo, word, number);
            convo.next();
        });
    };

    var searchDetail = function(response, convo, word, number) {
        convo.ask('どんな順番で表示する?', [{
            pattern: '日付',
            callback: function(response, convo) {
                youtube.addParam('order', 'date');
                convo.say('ok');
                searchingStart(response, convo, word, number);
                convo.next();
            }
        }, {
            pattern: '人気',
            callback: function(response, convo) {
                youtube.addParam('order', 'viewCount');
                convo.say('ok');
                searchingStart(response, convo, word, number);
                convo.next();
            }
        }, {
            pattern: '何でも',
            callback: function(response, convo) {
                convo.say('ok');
                searchingStart(response, convo, word, number);
                convo.next();
            }
        }]);
    };

    var searchingStart = function(response, convo, word, number) {
        var array = [];
        youtube.search(word, number, function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('result param');
            var items = result.items;
            console.log(items);
            for (var i in items) {
                var it = items[i];
                var titles = it.snippet.title;
                var video_id = it.id.videoId;
                var url = 'https://www.youtube.com/watch?v=' + video_id;
                convo.say(i + 'つ目のvideoは' + titles + '. ' + url);
                array.push(titles);
                console.log('+ ' + titles);
                console.log('|' + url);
                console.log('---------yeah-------');
            }
        });
        //convo.say('debug');


    };

    controller.hears('こんにちは', ['direct_mention', 'ambient'], function(bot, message) {
        bot.startConversation(message, qTime);
        console.log('First Func message');
        console.log(message);
    });

    var qTime = function(response, convo) {
        convo.say('こんにちは!!');
        convo.ask('今何をしていますか?', function(response, convo) {
            console.log('Second Func response');
            console.log(response.text);
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

    //convo.say(message_with_attachments);
})();
