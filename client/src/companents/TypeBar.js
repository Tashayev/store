//25п rsc и нажимаем таб. Левая панель.
import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {ListGroup} from "react-bootstrap";//Группы списков — это гибкий и мощный компонент для отображения серии контента.
// Модифицируйте и расширяйте их для поддержки практически любого содержимого внутри.

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <ListGroup>
            {device.types.map(type =>//Для каждого типа будем отображать ListGroup.Item.
                    // ListGroup.Item  класс .active для обозначения текущего активного выбора
            <ListGroup.Item
                style={{cursor: 'pointer'}}//27п.
                active={type.id === device.selectedType.id}//27п. К выбранному типу присваиваем action
                onClick={()=>device.setSelectedType(type)}//27п. Вешаем слушатель selectedType из DeviceStore.js из контекста index.js. И выберем тип
                key={type.id}/*Указываем ключ*/
            >
                {type.name}{/*внутри указываем название типа*/}
            </ListGroup.Item>
            )}
            {/*С помощи map пробежимся по всем компонента DeviceStore.js*/}
        </ListGroup>
    );
});

export default TypeBar;