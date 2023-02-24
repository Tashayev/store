//8п rsc и нажимаем таб
import React, {useContext, useState} from 'react';
import {Container, Form, Card, FormControl} from 'react-bootstrap'
import Button from "react-bootstrap/Button";//23п.
import {NavLink, useLocation, useNavigate,} from "react-router-dom";//23п.useLocation - этот хук возвращает текущий location объект.
// В зависимости в какой странице находится пользователь, необходима отрисовать либо страницу авториз., либо регист.
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, /*SHOP_ROUTE*/} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";



const Auth = observer(() => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE// isLogin - true если совпадает LOGIN_ROUTE
     const {user} = useContext(Context)//49п.
    const history = useNavigate()
    const [email, setEmail] = useState('')//46п.
    const [password, setPassword] = useState('')
    const click = async () => {//46п. С запроса будет возвращаться пользователь
        try{
            let data//49п.
            if (isLogin) {
                const data = await login(email, password);

            } else {
                const data = await registration(email, password);//пароль и эмайл выдаем как параметрами
            }
            user.setUser(user)//49п. После запроса сохраняем юзера
            user.setIsAuth(true)
            history(SHOP_ROUTE)
        }catch (err){
            alert(err.response.data.message)

        }
    }//46п.
    return (//23п. Содержимое Container - будет универсальным. Содержание: авторизация и регистрация.
        // Все что касаемо, стилей делаем при помощи будстрап и инлайн стилей
        <Container
            className="d-flex justify-content-center align-items-center"//className-используются для указания margin, padding, flex
            style={{height: window.innerHeight - 54}}//window.innerHeight - Высота всего браузера минус навбар.
        >
            <Card style={{width: 600}} className="p-5">{/*23п. Карточка - это гибкий и расширяемый контейнер содержимого.
            Она включает опции заголовков и футеров, широкий спектр контента, контекстуальные цвета бэкграунда и мощные опции отображения.*/}
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2> {/*isLogin = true - возвращает Авторизация, false - возвращает Регистрация*/}
                <Form className="d-flex flex-column"> {/*Формы - расширение для классов. Используйте эти классы для более точной настройки отображения
                    и лучшей отрисовки на разных браузерах и устройствах.*/}
                    <FormControl//Это текстовые инструменты контроля, который содержит основные стили внешнего вида,
                        // активного состояния, размерности и т.д.
                        className="mt-3"
                        placeholder="Введите ваш email..."//23п.
                        value={email}//46п.
                        onChange={e => setEmail(e.target.value)}//45п.
                    />
                    <FormControl
                        className="mt-3"
                        placeholder="Введите ваш пароль..."//23п.
                        value={password}//46п.
                        onChange={e => setPassword(e.target.value)}//46п. Вводя что-то в инпут сразу же изменяем состояние
                        type="password"
                    />

                </Form>
                <Form className="d-flex justify-content-between mt-3 pl-3 pr-3">
                    {isLogin ?//23п. Form - здесь оно нужно для отражения компонентов в одной строке
                        <div>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>{/*NavLink- в качестве ссылки*/}
                        </div>
                        :
                        <div>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                        </div>
                    }
                    <Button
                        variant={"outline-success"}//23п.
                        onClick={click}
                    >
                        {isLogin ? 'Войти' : 'Регистрация'}{/*23п. При автор. войти, при регис. Регистрация*/}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;