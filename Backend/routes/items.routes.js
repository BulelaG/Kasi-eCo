module.exports = itemBridge => {
    const router = require("express").Router();
    const controller = require("../controller/user.controller")

  // Item endpoints

    router.post('/add-item', controller.create); // ADD item

    router.get('/get-all-items', controller.getAllItems); // GET ALL item

    router.get('/:id', controller.getOneItem); // GET 1 item

    router.put('/:id', controller.updateItem)// UPDATE 1 item

    router.delete('/delete-all-items', controller.deleteAllItems); // DELETE ALL items

    router.delete('/:id', controller.deleteOneItems); // DELETE 1 item
  
  itemBridge.use('/v1/items',router)  
}