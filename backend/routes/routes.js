const Router = require('koa-router')
const router = new Router()

const ctrl =  require('../controllers/users')

router.get('/user/:id', ctrl.getUserById)
router.get('/users', ctrl.getAllUsers);
router.post('/users', ctrl.createUser);
router.put('/user/:id', ctrl.updateUser);
router.delete('/user/:id', ctrl.deleteUser);
router.get('/manager/:managerName', ctrl.getManagerAndEmployees);
router.allowedMethods()

module.exports = router
