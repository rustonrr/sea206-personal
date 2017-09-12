module.exports = {
    addToCart: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        let product = req.body;
        
        dbInstance.add_to_cart([product.productid, product.productprice, product.quantity, product.imgurl])
        .then( (product) => res.status(200).send(product) )
        .catch( () => res.status(500).send( 'error' ) )
    },
    viewCart: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        // console.log(req.body);
         dbInstance.get_cart(2) //the "1" here will be the unique userID
          .then( products => res.status(200).send( products ) )
          .catch( () => res.status(500).send() );
    }
};