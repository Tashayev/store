//52п. Авторизация  для админа
const jwt = require('jsonwebtoken')
module.exports = function (role) {//52 Этот мидлвер вызывает функцию передаем туда роль и передаем обратно.
    return function (req, res, next) {
        if(req.method ==="OPTION"){
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]// Bearer asfasnfkajsfnjk
            if(!token){
                return res.status(401).json({message: "Пользователь не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)//Если токен есть, верифицируем его
            if(decoded.role !== role){//Отличие от authMid == role то этого пользователя нет доступа
                return res.status(403).json({message: "Нет доступа"})
            }
            req.user = decoded // В поле юзер требуем токен
            next()// И во всех функциях этот юзер будет доступен
        }catch (e){// Если ошибка то:
            res.status(401).json({message: "Пользователь не авторизован"})
        }
    }
}


