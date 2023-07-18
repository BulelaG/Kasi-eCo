module.exports = app => {
    const router = require("express").Router();
    const controller = require("../controller/products.controller")
    const { authJwt } = require("../middlewares")

  	app.use((req, res, next) => {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    })

 // Products endpoints
//  [ authJwt.verifyToken ],
   router.post('/addProduct', [authJwt.verifyToken],  controller.createProduct); // ADD PRODUCT

   router.get('/inventory/:createdBy', [ authJwt.verifyToken ], controller.getProductsByCreatedBy); //GET  PRODUCT BY CREATOR

   router.get('/', controller.getAllProducts); // GET ALL PRODUCT

   router.get('/:id', controller.getProductById);   //GET  1 PRODUCT

   router.put('/:id', controller.updateProduct);// UPDATE 1 PRODUCT
  
   router.delete('/delete-all', controller.deleteAllProducts); // DELETE ALL PRODUCT
    
   router.delete('/:id', controller.deleteProduct); // DELETE 1 PRODUCT
  
  app.use('/v1/products/',router)  
}