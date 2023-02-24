//9п rsc и нажимаем таб. Тут описываются логика навигации pages. (Для авторизованных и для не авторизованных)
import React, {useContext} from 'react';
import {Routes, Route, Navigate, } from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
//9п.

const AppRouter = observer(() => {
    const {user} = useContext(Context)// 17п. Вместо временной заглушки, импорт из index.js
    //14п. const isAuth = falseВременная проверка(заглушка), в дальнейшем это будет делаться через сервер с помощи токена
    console.log(user)
    return (//14п. Switch - если не один маршрут(страница авторизации, регистрации или магазина) не отработает,
        // то отработает последний
            <Routes>
                {user.isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} exact/>
                )}
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} exact/>
                )}
                <Route path='*' element={<Navigate to={SHOP_ROUTE}/>} />
            </Routes>

    );/*Делаем деструктуризацию. Вытаскиваем путь и компоненты и для каждого элемента массива route, где указываем путь и компонент который,
        поэтому пути должен отрисововать, exact- ключ должен точно совпадать. isAuth/*проверка на админа*/
});

export default AppRouter;