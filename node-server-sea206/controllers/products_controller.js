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
    }
  };