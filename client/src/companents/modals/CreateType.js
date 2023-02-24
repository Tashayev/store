//39п. rsc+tab
import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {createType} from "../../http/deviceAPI";



const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState('')
    //58п. Создаем состояние с помощью useState
    const addType = () => {
        createType({name: value}).then(data => {//58п. Параметром запроса передаем имя, который получаем из состояния
            setValue('')//58п. После того как функция отработала успешна, в инпуте возвращаем пустую строку
            onHide()// и закрываем
        })
    }
    return (// Вставляем из bootstrap modal окна
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}//58п. Слушатель событие изменяем на то, что находится в инпуте
                        placeholder={"Введите название типа"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;