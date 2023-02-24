
const {Type} = require('../models/models')//35п.
const ApiError = require('../error/ApiError');

class TypeController {//30п.
    // Добавляем в БД объекты
    async create(req, res) {
         const {name} = req.body //36п. У пост-запроса всегда есть тело. Делаем ди структуризацию
         const type = await Type.create({name})// Извлекаем из тела имя типа и с помощью create создаем ее
         return res.json(type)
        // Здесь необходима проверить через постман: в поле get меняем на post, запишем юрл localhost/api/type, ставим row
        // в самом конце выберем json. В консоле:
        //{
            //'name': "string"
        // }//36п.
    }
//38п. Получаем объекты.
     async getAll(req, res) {
         const types = await Type.findAll()// Возвращает все существующие записи в БД.
         return res.json(types)
     }
//
 }
//
module.exports = new TypeController()