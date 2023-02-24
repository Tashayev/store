//20п rsc и нажимаем таб. Навигационная панель является простой оболочкой для позиционирования брендинг,
// навигация и другие элементы в заголовке краткое навигации. Это легко расширяемый и, с помощью нашего плагина крах,
// его можно легко интегрировать контент закадровый.
import React, {useContext} from 'react';
import {Context} from "../index";
import Nav from "react-bootstrap/Nav";
import Navbar  from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom"
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button, Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom'
//В зависимости авторизован пользователь или нет, навбар будет отражаться по-разному.
const NavBar = observer(() => {
    const {user} = useContext(Context)//36п.
    const history = useNavigate()
    const logOut = () => {//52п.
        user.setUser({})
        user.setIsAuth(false)
    }//52п.
    return (//20п. Здесь копируем навбар код с bootstrap.
        //22п. <NavLink> - это специальный тип <Link>, позволяющий определять стили для активного состояния ссылки.
        // className="ml-auto" - margin left
        // Используем тернарный оператор для проверки авторизован или нет. И отдельный для админа.
        //22п. Чтобы все происходила в режиме реальной времени импортируем из mobx observer.
        // Присваиваем его Navbar и оборачиваем им содержимое
        //Container - чтобы централизовать, все было на одном уровне содержимое навбара
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={SHOP_ROUTE}>КупиДевайс</NavLink>
                {user.isAuth ?//user.isAuth - здесь для авторизованных
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => history(ADMIN_ROUTE)}//36п. Оживляем админ кнопку
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}//52п.
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    ://user.isAuth - здесь для не авторизованных
                     <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history(LOGIN_ROUTE)}>Авторизация</Button>{/*52.п*/}
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;