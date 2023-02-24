//48п. Здесь мы будим декодировать токен и проверять его валидность Если токен не валидный возвращаем ошибку:
// Пользователь не авторизован
const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
    if(req.method ==="OPTION"){
        next()// Если запрос равен OPTION то пропускаем
    }
    try {
        const token = req.header.authorization.split()//Так как токен всегда в хедоре.
        // Обычно пишется тип токена: Bearer, а затем сам токен: jhdjkhdkjw.
        if(!token){
            return res.status(401).json({message: "Пользователь не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)//Если токен есть, верифицируем его
        req.user = decoded // В поле юзер требуем токен
        next()// И во всех функциях этот юзер будет доступен
    }catch (e){// Если ошибка то:
        res.status(401).json({message: "Пользователь не авторизован"})
    }
}//48п.