module.exports = app => {
    const router = require("express").Router();
    const controller = require("../controller/trader.controller")
    const { authJwt } = require("../middlewares")

    app.use((req, res, next) => {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    })

   // Trader endpoints

   router.post('/signup', controller.createTrader); // ADD TRADER

   router.post('/signin', controller.signin); // ADD TRADER


   router.get('/', controller.getAllTraders); // GET ALL TRADERS

   router.get('/:id', controller.getTraderById); // GET 1 TRADER

   router.put('/:id',  [authJwt.verifyToken], controller.updateTrader)// UPDATE 1 TRADER

   router.delete('/delete-all', controller.deleteAllTraders); // DELETE ALL TRADERS  

   router.delete('/:id', [authJwt.verifyToken], controller.deleteTrader); // DELETE 1 TRADER
  
  app.use('/v1/traders',router)  
}