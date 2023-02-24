//8п rsc и нажимаем таб. Это основная страница с карточками устройства, по страничный вывод, список брэндов итд.
//Система постраничного вывода - это набор кнопок или ссылок, позволяющих пользователю осуществить постраничный просмотр
import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";//24 п.
import TypeBar from '../companents/TypeBar'
import BrandBar from '../companents/BrandBar'
import DeviceList from "../companents/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import Pages from "../companents/Pages";


const Shop = observer(() => {
    const  {device} = useContext(Context)
    useEffect(()=>{
        fetchTypes().then(data=>device.setTypes(data))
        fetchBrands().then(data=>device.setBrands(data))
        fetchDevices(null, null, 1, 2).then(data => {
            //typeid, brandid передаем по 0, текущую страницу 1, 2 устройства
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            //65п. После первого получение товара, нужно сколько их получено.
            // Для того чтобы могли посчитать страницы
        })
        //rows- устройство идет с пагинацией
    }, [])//54п. Нам необходима подгружать девайсы. 2ой параметр будет пустым.
    useEffect(() =>{
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2).then(data => {
            //66п. Параметром передаем айдишники выборных типов, брэндов, текущую страницу
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    },[device.page, device.selectedType, device.selectedBrand])
    //66п. Массив зависимости передадим текущую страницу, теперь она будет вызываться каждый раз,
    // так же передаем выбранные типы и брэнды, что бы передавать при обновлении. Все что в массиве называются зависимостью

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}> {/*Для левой панель с типами 3 колонки*/}
                    <TypeBar/>
                </Col>
                <Col md={9}> {/*Для правой панели 9 колонок*/}
                    <BrandBar/> {/*29п.*/}
                    <DeviceList/>{/*34п.*/}
                    <Pages/>{/*62п.*/}
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;