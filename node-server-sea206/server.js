const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config()

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
    
    app.get('/nextID', cart_controller.nextID)
    
    const port = process.env.PORT || 8001;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`); } );
});
