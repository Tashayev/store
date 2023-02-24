//8п rsc и нажимаем таб. Страница админа - добавление, удаление товаров.
import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../companents/modals/CreateBrand";
import CreateDevice from "../companents/modals/CreateDevice";
import CreateType from "../companents/modals/CreateType";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    //41п. Хук useState - это функция, которая используется для хранения состояния в функциональном компоненте.
    // Он принимает аргумент как начальное значение состояния и возвращает массив с 2 элементами.
    // Первый элемент - это текущее значение состояния. Второй элемент - это функция обновления состояния.
    return (//37п.
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={()=>setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={()=>setBrandVisible(true)}
            >
                Добавить брэнд
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={()=>setDeviceVisible(true)}
            >
                Добавить устройство
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>{/*41п.*/}
        </Container>
    );
};

export default Admin;