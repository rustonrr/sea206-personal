module.exports = {
    getProducts: ( req, res, next ) => {
      const dbInstance = req.app.get('db');
      // res.status(200).send('hello')
      console.log(dbInstance.get_products);
      dbInstance.get_products()
        .then(products => { res.status(200).send(products); })
        .catch( err => { 
          res.status(500).send(err);
        });
    }
  };