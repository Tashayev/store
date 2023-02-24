const sequelize = require('../db')//14п.
const {DataTypes} = require('sequelize')// Описание типа поле (string, int ect)
// Описания моделей
const User = sequelize.define('user', { // 1 парам. название модели
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},// autoIncrement - Нумерация (1,2,3)
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},//primaryKey - Как правило, эти поля используются
    // для хранения уникальных идентификаторов объектов, которые перечислены в таблице, например, это может быть ID клиента
    // или товара. Каждая запись в таком поле должна быть уникальной; запись в поле не должна быть пустой; в одной таблице может
    // быть только один ключ (существуют также составные ключи, которые могут включать в себя несколько полей, однако в этой
    // статье мы не будем их рассматривать).
})

const BasketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},// Промежуточная таблица(связующая)
})//14п.

// Создаем 2 стороннюю связь
User.hasOne(Basket)
Basket.belongsTo(User)//для создания отношений один-к-одному используются hasOne() и belongsTo()
User.hasMany(Rating)//для один-ко-многим — hasMany() и belongsTo()
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: 'info'});//43п. Так как устройство является один ко многим.
// Указываем поле с характеристиками: {as: 'info'}
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, {through: TypeBrand })
Brand.belongsToMany(Type, {through: TypeBrand })//Для многие-ко-многим — два belongsToMany().
// В этом случаи необходимо создать промежуточную таблицу для описания, что и как все связано.

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo
}//14п. Экспортируем все отсюда.