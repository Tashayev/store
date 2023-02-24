//Middleware - это промежуточные звеня меж запросом и функции обработчика (req, res). Доступ к нему имеет админ.
const ApiError = require('../error/ApiError');// Импорт 33п.
module.exports = function (err, req, res, next) {// Параметры принимают: ошибку, запрос, ответ, next передает по цепочке middleware
    if(err instanceof ApiError){
        return res.status(err.status).json({message: err.message})// Если ошибка совпадает с ApiError
    }
    return res.status(500).json({message: "Непредвиденная ошибка!"})// Если нет совпадении
}//33п.