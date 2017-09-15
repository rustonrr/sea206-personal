module.exports = {
    addToCart: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        let product = req.body;
        // let userid = localStorage.getItem('userid');
        
        dbInstance.add_to_cart([product.userid, product.productid, product.productprice, product.quantity, product.imgurl])
        .then( (product) => res.status(200).send(product) )
        .catch( () => res.status(500).send( 'error' ) );
    },
    viewCart: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        let userid = req.query.userid;
        // console.log(req.body);
         dbInstance.get_cart([userid]) // here will be the unique userID
          .then( products => res.status(200).send( products ) )
          .catch( () => res.status(500).send() );
    },
    removeFromCart: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        // console.log(req.query.entryid)

        dbInstance.remove_from_cart([req.query.entryid])

        .then( () => res.status(200).send() )
        .catch( () => res.status(500).send('error while removing') );
    },
    nextID: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        // console.log(req.body)
        dbInstance.next_id()
        .then(userid => res.status(200).send( userid ) )
        .catch( () => res.status(500).send());
    },
    reviewOrder: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        let userid = req.query.userid;

         dbInstance.review_order([userid])
          .then( products => res.status(200).send( products ) )
          .catch( () => res.status(500).send() );
    },
    orderComplete: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        let userid = req.query.userid;

        dbInstance.order_complete([userid])
        .then( products => res.status(200).send( products ) )
        .catch( () => res.status(500).send() );
    }
};