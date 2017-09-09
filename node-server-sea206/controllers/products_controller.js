module.exports = {
    getProducts: ( req, res, next ) => {
      const dbInstance = req.app.get('db');

      dbInstance.get_products()
        .then(products => { res.status(200).send(products); })
        .catch( err => { 
          res.status(500).send(err);
        });
    }
  };