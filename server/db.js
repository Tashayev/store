const {Sequelize} = require('sequelize')//Это инструмент для организации взаимодействия между платформой Node.js
// и реляционными базами данными без использования специального языка запросов SQL. 8п.

module.exports = new Sequelize(// 8п. Будем экспортировать необходимые модули из sequelize
    process.env.DB_NAME, // Название БД. 12п.
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, // ПАРОЛЬ 12п.
    {
        //Указываем все необходимые настройки
        dialect: 'postgres',//Диалект указывает тип базы данных, используемой в спящем
        // режиме, чтобы спящий режим мог переключаться на код генератора SQL для конкретной базы данных.
        host: process.env.DB_HOST,//Хост – это IP-адрес, который присваивается пользователю для его идентификации в сети
        port: process.env.DB_PORT//12 п.
    }
)

