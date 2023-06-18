module.exports = rs => {
    const router = require("express").Router();
    const controller = require("../controller/user.controller")


    router.post('/signup', controller.create); // ADD USER

    router.get('/', controller.getAll); // GET ALL USERS

    router.delete('/', controller.deleteAll); // DELETE ALL USERS

    router.put('/:id', controller.update)// UPDATE 1 USER

    router.delete('/:id', controller.deleteOne); // DELETE 1 USERS

    rs.use('/v1/users',router)  
}