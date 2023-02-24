//31п. rsc+tab
import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Row} from "react-bootstrap";
import {Context} from "../index";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const {device} = useContext(Context)
    console.log(device)
    return (
        <Row className="d-flex">
            {device.devices.map(device =>
                //33п. Для каждого устройства будут отражаться компонент в DeviceItem
                <DeviceItem key={device.id} device={device}/>
            )}
        </Row>
    );
});

export default DeviceList;