'use strict';

var express = require('express');
var router = express.Router();
var paypal = require('paypal-rest-sdk');

paypal.configure({
    'host': 'api.sandbox.paypal.com',
    'client_id': 'ATaIxhBBRK_7ufNny0euc1nzXvGU56ClU-FE73vtNefqkrxy7bNQQ7tg2aeB',
    'client_secret': 'EIhGXxA4pc3iArrBoddTzFLqQAB8NgJLeBZwjBgfF3wCSlz5kKE1ZW8O8snb'
});

/* GET home page. */
router.get('/', function (req, res) {
    var paymentDetails = {
        'intent': 'sale',
        'payer': {
            'payment_method': 'paypal'
        },
        'redirect_urls': {
            'return_url': 'http://localhost:3000/return',
            'cancel_url': 'http://localhost:3000/cancel'
        },
        'transactions': [{
            'description': 'Test transaction',
            'amount': {
                'total': '5.00',
                'currency': 'USD'
            }
        }]
    };

    paypal.payment.create(paymentDetails, function (error, payment) {
        if (!error) {
            var redirectUrl;
            for (var i=0; i<payment.links.length; i++) {
                var link = payment.links[i];
                if (link.rel === 'approval_url') {
                    redirectUrl = link.href;
                    break;
                }
            }
            req.session.paymentID = payment.id;
            res.redirect(redirectUrl);
        } else {
            res.render('error', {
                'title': 'Error when generating payment',
                'error': error
            });
        }
    });
});

router.get('/return', function (req, res) {
    var paymentID = req.session.paymentID;
    var payerID = req.param('PayerID');

    var paymentDetails = {
        'payer_id': payerID
    };
    paypal.payment.execute(paymentID, paymentDetails, function (error, payment) {
        if (!error) {
            res.render('output', {
                title: 'Payment completed',
                result: JSON.stringify(payment, null, 2)
            });
        } else {
            res.render('error', {
                'title': 'Error when executing payment',
                'error': error
            });
        }
    });
});

router.get('/cancel', function (req, res) {
    res.render('output', {
        'title': 'Payment got canceled'
    });
});

module.exports = router;
