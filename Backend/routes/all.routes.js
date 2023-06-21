
// ---------------
// userRoutes(userBridge)
// traderRoutes(traderBridge)
// customerRoutes(customerBridge) 
// productsRoutes(productsBridge) 
// ordersRoutes(ordersBridge) 
// ------------







module.exports = rs => {
    const router = require("express").Router();
    const controller = require("../controller/all-user.controller")

  // User endpoints

    router.post('/signup', controller.create); // ADD USER

    router.get('/get-all-users', controller.getAll); // GET ALL USERS

    router.get('/:id', controller.getOne); // GET 1 USER

    router.put('/:id', controller.update)// UPDATE 1 USER

    router.delete('/delete-all', controller.deleteAll); // DELETE ALL USERS

    router.delete('/:id', controller.deleteOne); // DELETE 1 USERS


   // Trader endpoints

   router.post('/trader-signup', controller.createTrader); // ADD TRADER

   router.get('/get-all-traders', controller.getAllTraders); // GET ALL TRADERS

   router.get('/:id', controller.getTraderById); // GET 1 TRADER

   router.put('/:id', controller.updateTrader)// UPDATE 1 TRADER

   router.delete('/delete-all-traders', controller.deleteAllTraders); // DELETE ALL TRADERS  

   router.delete('/:id', controller.deleteTrader); // DELETE 1 TRADER


    // Customer endpoints

   router.post('/customer-signup', controller.createCustomer); // ADD CUSTOMER

   router.get('/get-all-customers', controller.getAllCustomers); // GET ALL CUSTOMERS

   router.get('/:id', controller.getCustomerById); // GET 1 TRADER

   router.put('/:id', controller.updateCustomer)// UPDATE 1 CUSTOMERS

   router.delete('/delete-all-customers', controller.deleteAllCustomers); // DELETE ALL CUSTOMERS

   router.delete('/:id', controller.deleteCustomer); // DELETE 1 CUSTOMERS



 // Products endpoints

   router.post('/add-product', controller.createProduct); // ADD PRODUCT

   router.get('/get-all-products', controller.getAllProducts); // GET ALL PRODUCT

   router.get('/:id', controller.getProductById);   //GET  1 PRODUCT

   router.put('/:id', controller.updateProduct);// UPDATE 1 PRODUCT
  
   router.delete('/delete-all-products', controller.deleteAllProducts); // DELETE ALL PRODUCT
    
   router.delete('/:id', controller.deleteProduct); // DELETE 1 PRODUCT
  
  
  // Orders endpoints

  router.post('/add-order', controller.createOrder); // ADD ORDER

  router.get('/get-all-orders', controller.getAllOrders); // GET ALL ORDERS

  router.get('/:id', controller.getAllOrders); // GET ALL ORDERS

  router.put('/:id', controller.updateOrder)// UPDATE 1 ORDER
 
  router.delete('/delete-all-orders', controller.deleteAllOrders); // DELETE ALL ORDERS
  
  router.delete('/:id', controller. deleteOrder); // DELETE 1 ORDER
 
  
  rs.use('/v1/users',router)  
}