import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Form} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <Form className="d-flex">
            {device.brands.map(brand =>//28п.
                    // Пробежимся с помощью мап по брендам и для каждого брэнда передаем карточки
            <Card
                style={{cursor:'pointer'}}
                key={brand.id}
                className="p-3"
                onClick={() => device.setSelectedBrand(brand)}//30п. Вешаем слушатель selectedBrand из DeviceStore.js из контекста index.js. И выберем тип
                 border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}//30п. Здесь нет проб Актив, по этому выделение с помощью borderости .
                // Сравниваем id с выбранным, в зависимости от него отражаем цвет рамки.
            >
                {brand.name}{/*Название брэнда*/}
            </Card>
                )}
        </Form>
    );
});

export default BrandBar;