const Router = require('express')//23п.
const router = new Router()
const userController = require('../controllers/userController')//29п. Импорт юзер-контроллера
const authMiddleware = require('../middleware/authMiddleware')//49п. Импорт authMiddleware

router.post('/registration', userController.registration)//23п. 29п. 2 параметром передаем регистратор, логин чек.
router.post('/login', userController.login)////37п. параметр
router.get('/auth', authMiddleware, userController.check)//2 парам.  49п. authMiddleware - будет проверять на авторизованность
//Проверка на авторизацию пользователя.
/* После auth,  в качестве теста (req, res)=>{
    res.json({message: "Work"}
})*/


module.exports = router