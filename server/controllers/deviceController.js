const uuid = require('uuid')//40п. Универсальный уникальный идентификатор (UUID). Это просто значение,
// которое можно смело считать уникальным. Риск столкновения настолько низок, что вы можете разумно вообще игнорировать его.
const path = require('path');//40п. Адаптация директории к текущей ОС.(без паз-модуля нам пришлось бы писать путь от руки)
const {Device, DeviceInfo} = require('../models/models')//40п. Создаем сам устройство.//44п. Импорт модели инфо
const ApiError = require('../error/ApiError');// Try-catch вызываем его
//
class DeviceController {//30п.
    async create(req, res, next) {//30п.
         try {// Как и прежде оборачиваем в try-catch, во избежание ошибок.
            let {name, price, brandId, typeId, info} = req.body//Получаем данные из тела запроса. info создано в models.js
            const {img} = req.files//Картинка для каждого устройства
            let fileName = uuid.v4() + ".jpg"//40п.sta Генерирует случайное id
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))// 40п. Перемещение полученных файлов отправленные клиентом.
        //Метод path.resolve()преобразует последовательность путей или сегментов пути в абсолютный путь.
        // __dirname - путь до текущей папки. 2 точки папки между ними. Папка с нужным файлом. Сам файл. Так мы переместим файл в нужную папку.
            const device = await Device.create({name, price, brandId, typeId, img: fileName});//В созданный девайс передаем все параметры
            if (info) {//44п. Если инфо передали в теле запроса.
                info = JSON.parse(info)//Если предавать данные через форум дату они приходят в виде строки. По этому парсим массив.
                // На обратном пути JS объекты.
                info.forEach(i =>// Поле того как распарсили с помощи foreach пробегаемся. Await не ставим чтобы не блокировать поток
                    DeviceInfo.create({//Для каждого элемента массива вызываем функ. криейт.
                        title: i.title,// Сам объект задаем заголовок. Получаем через i и так же опис.
                        description: i.description,
                        deviceId: device.id// ID Присваивается после создание. По этому перенесем до условия.
                    })
                )}
             return res.json(device)// После создание возвращаем информацию об устройстве
         } catch (e) {
             next(ApiError.badRequest(e.message))
         }

    }

    async getAll(req, res) {//30п. Получение всех девайсов
        let {brandId, typeId, limit, page} = req.query//42п. brandId, typeId, limit, page будем получать из query.
        // limit это количество девайсов которые будут отражаться на странице.
        page = page || 1// 42п. Если страница не указана, сделаем ее 1
        limit = limit || 9// 42п. По дефолту делаем лимит 9 устройств.
        let offset = page * limit - limit//42п. Подсчет отступов. К примеру на вторую страницу или пропустить первые 9 товаров.
        // 2 (выброженная страница) * 9(лимит) - 9(лимит) = 9
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})//42п. Если брэнда и типа нет, то возвращаем все девайсы.
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})//42п. Если нет типа, то брэнд.
            //Так как здесь есть ID, с помощи where указываем в каких именно полях искать данный ID.
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})//42п. Если нет брэнда, то тип
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})//42п. Если оба есть то, воз. девайс
        }
        return res.json(devices)//42п.
    }
//
     async getOne(req, res) {//30п.
         const {id} = req.params//44п. Сперва получаем ID. Параметр указывается в роуторе
         const device = await Device.findOne(//
             {
                 where: {id},//Указываем что искать
                 include: [{model: DeviceInfo, as: 'info'}]//44п. И включительно характеристики
             },
         )
          return res.json(device)//44п. Проверка на Postman. http://localhost:5000/api/device/1 1 это id.
     }
 }

 module.exports = new DeviceController()//30п.