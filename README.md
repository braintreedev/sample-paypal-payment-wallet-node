# Using the PayPal SDK in Express 4 to process a PayPal wallet payment

This is an example of the PayPal SDK using the official Node SDK in Express 4 to set up a PayPal wallet payment.

## Technology

This demo uses

* Node 0.10.26 or higher
* The [Express](http://expressjs.com/) web framework
* The [PayPal Node SDK](http://github.com/paypal/rest-api-sdk-nodejs/)

## Running the demo

* Run `npm install` to install all dependencies
* Run `npm start` to start the app
* Visit `http://127.0.0.1:3000/` in your browser
* You will be redirected to PayPal
* Login using the following credentials:
  * Username: `us-customer@commercefactory.org`
  * Password: `test1234`
* Complete the payment instructions
* You will receive a message that says __"Payment completed"__

## Useful links

* [The PayPal Node SDK](http://github.com/paypal/rest-api-sdk-nodejs/)
* [The PayPal API Reference](http://developer.paypal.com/webapps/developer/docs/api/)
