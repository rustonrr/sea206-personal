const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config()

const products_controller = require('./controllers/products_controller.js');

const app = express();
app.use( bodyParser.json() );
app.use( cors() );

massive( process.env.CONNECTION_STRING ).then( (dbInstance) => {
    app.set('db', dbInstance);

    // dbInstance.new_products()
    // .then( products => console.log(products) )
    // .catch( err => console.log(err) );

    // dbInstance.get_products()
    // .then (products => console.log(products) )
    // .catch(err => console.log(err) );
    
    app.get('/products', products_controller.getProducts);
    app.get('/product/:productid', products_controller.getProduct);
    
    const port = process.env.PORT || 8001;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`); } );
});
