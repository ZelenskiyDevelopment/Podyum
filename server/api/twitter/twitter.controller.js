'use strict';

var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'GbmtmeZjfra5pUKjicJky2gIP',
    consumer_secret: 'bKjH304cOfNrTPjUipytVgPqGs1Gqsxr5Ulehe4dqiwAZt3xj8',
    access_token_key: '1613377944-SbTWAPTKVAIoIYlVbptPWLmkP3DRVMSMxiAT43w',
    access_token_secret: 'j6F2YB7cB4e3V9mqnlzguoPFKWyfR5eTPsnADEMTDkfMr'
});


exports.timeLine = function(req, res) {

    var params = {user_id: req.params.id};

    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (!error) {
            return res.json(200, tweets);
        }
    });

};