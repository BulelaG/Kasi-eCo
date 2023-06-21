module.exports = traderBridge => {
    const router = require("express").Router();
    const controller = require("../controller/trader.controller")

   // Trader endpoints

   router.post('/trader-signup', controller.createTrader); // ADD TRADER

   router.get('/get-all-traders', controller.getAllTraders); // GET ALL TRADERS

   router.get('/:id', controller.getTraderById); // GET 1 TRADER

   router.put('/:id', controller.updateTrader)// UPDATE 1 TRADER

   router.delete('/delete-all-traders', controller.deleteAllTraders); // DELETE ALL TRADERS  

   router.delete('/:id', controller.deleteTrader); // DELETE 1 TRADER

  
  traderBridge.use('/v1/traders',router)  
}