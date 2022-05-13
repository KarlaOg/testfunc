const { Router } = require("express");
const userController = require("../controllers/user.controller");
const router = new Router();

router.get('/', userController.getAllUser);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);



module.exports = router;