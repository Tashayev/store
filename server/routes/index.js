//index связывает все routes во едина //20п .
const Router = require('express')
const router = new Router()// Создаем объект из routes
const deviceRouter = require('./deviceRouter')//25п. Экспортируем все роуты
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
// Все остальные роуты являются подроутами, необходимо указать все это здесь.
router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)

module.exports = router