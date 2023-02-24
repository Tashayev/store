// 11п. Описание всех маршрутов для всех страниц приложения.
import {ADMIN_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "./utils/consts";
import Admin from "./pages/Admin";
import DevicePages from "./pages/DevicePages";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";

export  const authRoutes =[
    {
        path: ADMIN_ROUTE,//13п. И здесь указываем не путь, а константу
        Component: Admin
    },
    {
        path: ADMIN_ROUTE,//13п. И здесь указываем не путь, а константу
        Component: Admin
    },
]//Страница авторизованных пользователей. Для описания маршрута во избежания ошибок создадим util=> consts.js
export  const publicRoutes =[
    {
        path: SHOP_ROUTE,//13п. И здесь указываем не путь, а константу
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,//13п. И здесь указываем не путь, а константу
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,//13п. И здесь указываем не путь
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',//13п. И здесь указываем не путь, а константу, а константу, id указывается для конкретного устройства
        Component: DevicePages
    },

]//Страница не авторизованных пользователей. Описанные маршруты здесь оживляем в AppRouter.js
