//39п. rsc+tab
import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrands, fetchDevices, fetchTypes} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";


const CreateDevice = observer(({show, onHide}) => {// show - проп отвечает видна ли модальная страница или нет.
    // onHide - скрывает модальные страницы
    const {device} = useContext(Context);
    const [info, setInfo] = useState([])//41п. useStage заменяет класс.
    const [price, setPrice] = useState(0)//60п. Для несколько инпутов создаем несколько состоянии
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    useEffect(()=>{
        fetchTypes().then(data=>device.setTypes(data))
        fetchBrands().then(data=>device.setBrands(data))
    }, [])
    const addInfo = () =>{// Для кнопки добавить свойства(onClick)
        setInfo([...info, {title:'', description:'', number: Date.now()}])//
        // Date.now служить в качестве id (test)
    }
    const changeInfo = (key, value, number)=>{//60п. Заполнение окон характеристик
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }//если номер совпадает с номером итерации массива, то разворачиваем(изменяем) в ней объект по ключу(title description),
    // в ином случае оставляем как есть
    const removeInfo = (number) =>{//Функция для удаления
        setInfo(info.filter(i => i.number !== number))
        //Удаляем через фильтр если id не соответствует текущему id, то удаляем
        //number === id в setInfo
    }
    const selectFile = e => {//60п.
        setFile(e.target.files[0])//сохраняем файл, по 0-му индексу обращаемся к массиву
    }
    const addDevice = ()=>{//60п. Отправляем запрос на сервер.
        const formData = new FormData()//для создания формы девайса используем формдату(как и в постмане)
        formData.append('name', name)//первый параметр ключ, второй название
        formData.append('price',`${price}`)//
        formData.append('img', file)//
        formData.append('brandId', device.selectedBrand.id)//Брэнд и тип получаем из стора
        formData.append('typeId', device.selectedType.id)//
        formData.append('info', JSON.stringify(info))//массив невозможно передать, по этому передаем как Json строка,
        // на сервере оно обратно парсится как массив
        createDevice(formData).then(data=>onHide())//Здесь мы вызываем функцию для запроса на сервер.
        // Если запрос прошел закрываем
    }
    return (// Вставляем из bootstrap modal окна
        <Modal /*41п. Всплывающие окна*/
            show={show}
            onHide={onHide}//Структура content - это массив. Но, когда вы делаете объект observable, то массив преобразовывается
            // в объект, который уже не является классическим массивом
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-3 mb-2">
                        <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>//device с DeviceStore получаем все типы через мап
                                <Dropdown.Item
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-3 mb-2">
                        <Dropdown.Toggle>{device.selectedBrand.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand=>//Так же как и типы получаем брэнды.
                                <Dropdown.Item
                                    onClick={()=>device.setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}

                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите имя устройство"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    >
                    </Form.Control>
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите стоимость устройство"
                        type="number"
                        value={price}
                        onChange={e=>setPrice(Number(e.target.value))}
                    >
                    </Form.Control>
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}//60п.

                    >
                    </Form.Control>
                    <hr/>
                    <Button
                        variant="outline-dark"
                        onClick={addInfo}
                    >
                        Добавить новые свойства
                    </Button>
                    {info.map(i=>//Для мобильности передаем массив с инфо в мап
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control// Для каждой характеристики отражаем инпуты, кнопки с удалением
                                placeholder="Введите название свойства"
                                value={i.title}
                                onChange={(e)=>changeInfo("title", e.target.value, i.number )}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                placeholder="Введите описание свойства"
                                value={i.description}
                                onChange={(e)=>changeInfo("description", e.target.value, i.number)}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant="outline-danger"
                                    onClick={()=>removeInfo(i.number)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>/*41п.*/
    );
});

export default CreateDevice;