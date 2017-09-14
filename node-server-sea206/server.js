require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');

const stripe = require("stripe")("pk_test_9WZYVS7dxLuosBrE2oKcLJQg");

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

        console.log(req.body.token.id);

        stripe.charges.create({
        amount: 100, // amount in cents, again
        currency: 'usd',
        source: req.body.token.id,
        description: 'Test charge from react app'
      }, function(err, charge) {
          if (err) return res.sendStatus(500)
          return res.sendStatus(200);
        });
    });
    


    
    const port = process.env.PORT || 8001;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`); } );
});
