const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')// 47п.
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')// Модели пользователя

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},//Здесь по дефолту присваивается юзер
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}// Генерация токена, первый парам payload куда будут вшиваться данные. 2 парам передадим env файл
// (секретный ключ). Криптография — это процесс преобразования простого текста в нечитаемый,
//который хешируется из текста и наоборот, а функция crypto.sign () используется для создания подписи данных.
class UserController {//29п. Для того чтобы отделить логику от роутс, создаем controllers
     async registration(req, res, next) {//28п.
        const {email, password, role} = req.body//47п.  Из тела запроса
        if (!email || !password) {// 47п. Если срабатывают обе возвращаем ошибку
             return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})//47п. Проверка существует ли емайл
        if (candidate) {// Если такой есть то даем ошибку
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)//2 параметр - количество хеширование
         //Если не нашли. То можно хэшировать пароль и создать пользователя
         const user = await User.create({email, role, password: hashPassword})//Пароль передаем хэшом
         const basket = await Basket.create({userId: user.id})// Сразу пользователю передаем баскет
         const token = generateJwt(user.id, user.email, user.role)//Ранее созданной generateJwt юзер айди, майл и пароль
         return res.json({token})//47п.
     }

    async login(req, res, next) {//28п. Авторизация
         const {email, password} = req.body//47п. Получаем из тела запроса имайл и пароль
         const user = await User.findOne({where: {email}})// Проверяем есть ли такой логин
         if (!user) {// Если нет ошибка
             return next(ApiError.internal('Пользователь не найден'))
         }
         let comparePassword = bcrypt.compareSync(password, user.password)//1 парам написанный клееном,2 из БД
        //Если в БД есть такой логин то, сверяем пароль с использованием bcrypt
         if (!comparePassword) {
             return next(ApiError.internal('Указан неверный пароль'))
         }//Не правильный пароль - выдаем не бад реквест, а внутреннею ошибку
         const token = generateJwt(user.id, user.email, user.role)// Генерируем токен
         return res.json({token})//47п. И возвращаем клиенту свм токен
    }

     async check(req, res, next) {//28п.
//For testing        res.json({message: "Wцв"})
         /*Проверка const query = req.query //Одним из способов передачи данных в приложение представляет
         использование параметров строки запроса. Строка запроса (query) - фактически это часть запрошенного адреса,
         которая идет после знака вопроса. Например, в запросе http://localhost:3000/about?id=3&name=Tome часть
         id=3&name=Tome представляет строку запроса.
         res.json(query) */ //31п. Универсальная обработка ошибок. Json - если бы мы хотели бы преобразовать сложный объект
         // в строку, чтобы отправить по сети или просто вывести для логирования.
         //Если нас интересует параметр id

         //const {id} = req.query31п.
         /*if(!id){//35п. Ошибка если ID не задан
             return next(ApiError.badRequest("Не задан ID"))
         }*///35п.
         //res.json(id) 31п.Если клиент не указал этот параметр то необходима сгенерировать ошибку => папка еррор
         const token = generateJwt(req.user.id, req.user.email, req.user.role)
         return res.json({token})//Если не сгенерировать токен, то функция чек будит перезаписывать каждый раз
         // новый токен для пользователя
         // 51п.

     }
 }

 module.exports = new UserController()//28п.