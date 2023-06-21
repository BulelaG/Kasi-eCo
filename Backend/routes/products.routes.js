module.exports = rs => {
    const router = require("express").Router();
    const controller = require("../controller/products.controller")

 // Products endpoints

   router.post('/add-product', controller.createProduct); // ADD PRODUCT

   router.get('/get-all-products', controller.getAllProducts); // GET ALL PRODUCT

   router.get('/:id', controller.getProductById);   //GET  1 PRODUCT

   router.put('/:id', controller.updateProduct);// UPDATE 1 PRODUCT
  
   router.delete('/delete-all-products', controller.deleteAllProducts); // DELETE ALL PRODUCT
    
   router.delete('/:id', controller.deleteProduct); // DELETE 1 PRODUCT
  
  rs.use('/v1/products',router)  
}