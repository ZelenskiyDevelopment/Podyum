'use strict';

var paypal = require('paypal-rest-sdk');

var SubscriptionModel = require('./subscription.model');


var config = {
    'mode':'sandbox',
    'client_id': 'ARnGtjStrDT3ysrrK6S8u59I7pmzIhQ7PrY95nlUn4zXB2wo2nYGzwk5TuVMysnf3eheV7QOu_CgbOsv',
    'client_secret': 'EG9uIahwMjngoWbRA_eRdsYDsxyqQqlu0D02AUYOO9U3WBFSSkdJ72SqNs52MowkRdq12U0ldvEWKQFv'
};

paypal.configure(config.api);

exports.success = function(req,res) {

    console.log(res);

}
exports.cancel = function(req,res) {


}

exports.pay = function(req,res) {

    var data  = req.body;

    var NewPay = new SubscriptionModel({
        type:data.type,
        amount:data.amount,
        id_user:data.id_user,
        pay:false
    });


    NewPay.save(function(err) {
        if (err) throw err;



//        paypal.payment.create(payment, function (err, res) {
//            if (err) {
//              console.log(err);
//            } else {
//                if(payment.payer.payment_method === 'paypal') {
//                    req.paymentId = payment.id;
//                    var redirectUrl;
//                    console.log(payment);
//                    for(var i=0; i < payment.links.length; i++) {
//                        var link = payment.links[i];
//                        if (link.method === 'REDIRECT') {
//                            redirectUrl = link.href;
//                        }
//                    }
//                   console.log(redirectUrl);
//                }
//            }
//
//
//        });

    });


    var payment = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http:localhost:9000/api/subscription/success",
            "cancel_url": "http:localhost:9000/api/subscription/cancel"
        },
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total":parseInt(data.amount)
            },
            "description": "This is the payment description."
        }]
    };
    paypal.payment.create(payment, config, function (err, res) {
        if (err) {
            throw err;
        }

        if (res) {
            console.log("Create Payment Response");
            console.log(res);
        }
    });
}