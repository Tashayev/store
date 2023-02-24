const Router = require('express')//24п.
const router = new Router()
const deviceController = require('../controllers/deviceController')

router.post('/', deviceController.create)//37п. параметр
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)// id - для того чтобы выбрать отделанное устройство

module.exports = router