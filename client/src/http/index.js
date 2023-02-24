//42п. Соединение с бэком
import axios from "axios";
const $host = axios.create({//42п. Запрос для входа без авторизации
    baseURL: process.env.REACT_APP_API_URL//44п. Сюда будут отправляться запросы
})
const $authHost = axios.create({//42п. Запрос для входа с авторизации
    baseURL: process.env.REACT_APP_API_URL//44п. Сюда будут отправляться запросы
})

//44п. В случаи 2-го инстанса будим подставлять токены.
// Interceptor - это метод, который запускаются до или после основного метода. Существует два типа interceptor(перехватчиков).
// Request interceptor:- позволяет вам написать или выполнить часть вашего кода до того, как запрос будет отправлен.
// Response interceptor: -Он позволяет вам написать или выполнить часть вашего кода до того, как ответ достигнет вызывающего конца.
// В данном случае interceptor используется для привязки токена в запросе (также можно и в ответе)
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}//44п. Токен получаем из локального хранилище по ключу токен


$authHost.interceptors.request.use(authInterceptor)//44п. Вешаем интерцептер запроса на authHost
export {
    $host,
    $authHost
}