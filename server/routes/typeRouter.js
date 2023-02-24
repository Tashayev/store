const Router = require('express')//22п.
const router = new Router()
const typeController = require('../controllers/typeController') //36п. Пишем маршрут для TypeControllers
const checkRole = require('../middleware/checkRoleMiddleware')//53п. Инпорт из checkRoleMiddleware

router.post('/', checkRole('ADMIN'), typeController.create)//1 параметр юрл, 2параметр сам модуль.//37п. параметр.
// 52п. 2 парам вызываем функцию. Это нужно сделать и остальным роутерам, передать роль.
router.get('/', typeController.getAll)

module.exports = router