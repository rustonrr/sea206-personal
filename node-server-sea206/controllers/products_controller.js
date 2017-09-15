module.exports = {
    getProducts: ( req, res, next ) => {
      const dbInstance = req.app.get('db');

      dbInstance.get_products()
        .then(products => { res.status(200).send(products); })
        .catch( err => { 
          res.status(500).send(err);
        });
    },
    getProduct: ( req, res, next ) => {
      const dbInstance = req.app.get('db');

      dbInstance.get_product([req.params.productid])
      .then( (product) => {
        if(product.length) {
          res.status(200).send(product[0])
        } else {
          res.status(404).send()
        }
      })
      .catch( () => res.status(500).send() );
    },
    getSampleProducts: ( req, res, next ) => {
      const dbInstance = req.app.get('db');

      dbInstance.get_sample_products()
      .then(products => { res.status(200).send(products); })
      .catch( err => { 
        res.status(500).send(err);
      });
    },
    submitReview: ( req, res, next ) => {
      const dbInstance = req.app.get('db');
      let product = req.body

      dbInstance.submit_review([product.userid, product.productid, product.reviewtext])
      .then( (review) => res.status(200).send(review) )
      .catch( () => res.status(500).send( 'error' ) );
    },
    getReviews: (req, res, next ) => {
      const dbInstance = req.app.get('db');
      
      dbInstance.get_reviews([req.params.productid])
        .then(products => { res.status(200).send(products); })
        .catch( err => {res.status(500).send(err);});
    }
  };