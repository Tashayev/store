//8п rsc и нажимаем таб. Страница с характеристиками устройства
import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useParams} from "react-router-dom";
import {fetchOneDevice} from "../http/deviceAPI";
const DevicePages = () => {
    const [device, setDevice] = useState({info:[]})//57п. Локальное состояние с пустым массивом
    const {id} = useParams()//57п. Необходимый объект из даты
    useEffect(()=>{
        fetchOneDevice(id).then(data => setDevice(data))
    },[])
    return (
        <Container>
            <Row className="mt-3">
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Form className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width:240, height:240, backgroundSize: 'cover', fontSize:64}}
                        >
                            {device.rating}
                        </div>
                    </Form>
                </Col>
                <Col md={4}>
                    <Card
                    className="d-flex flex-column align-items-center justify-content-around"
                    style={{width: 300, height:300,fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>От: {device.price} тг.</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info.map((info, index)=>// Из массива description info.id title descrip.
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding:10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePages;