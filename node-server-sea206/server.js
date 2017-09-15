require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');

const stripe = require("stripe")(process.env.STRIPE_API);

const products_controller = require('./controllers/products_controller.js');
const cart_controller = require('./controllers/cart_controller.js');

const app = express();
app.use( bodyParser.json() );
app.use( cors() );

massive( process.env.CONNECTION_STRING ).then( (dbInstance) => {
    app.set('db', dbInstance);

    
    app.get('/sampleproducts', products_controller.getSampleProducts);
    app.get('/products', products_controller.getProducts);
    app.get('/product/:productid', products_controller.getProduct);

    app.post('/addToCart', cart_controller.addToCart);
    app.get('/viewCart', cart_controller.viewCart);
    app.get('/reviewOrder', cart_controller.reviewOrder);
    
    app.get('/nextID', cart_controller.nextID)

    app.delete('/removeFromCart', cart_controller.removeFromCart);



    app.post('/api/payment', function(req, res, next){
        // console.log(req.body);
        let total = req.body.total * 100

        stripe.charges.create({
        amount: total, // amount in cents, again
        currency: 'usd',
        source: req.body.token.id,
        description: 'SEA 206 product purchase' // make this a custom description based on product
      }, function(err, charge) {
          if(err){
            // console.log(err);
            return res.sendStatus(500);
          } else {
            //   console.log(charge);
              return res.sendStatus(200);
          }
        });
    });

    app.delete('/ordercomplete', cart_controller.orderComplete);
    app.post('/submitReview', products_controller.submitReview);
    app.get('/getReviews/:productid', products_controller.getReviews);
    


    
    const port = process.env.PORT || 8001;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`); } );
});
