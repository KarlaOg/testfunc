const { Router } = require("express");
const userController = require("../controllers/user.controller");
const router = new Router();
const auth = require("../middleware/auth");

router.get('/', auth ,  userController.getAllUser);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.login);



module.exports = router;