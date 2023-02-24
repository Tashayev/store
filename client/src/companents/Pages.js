//61п.
import React, {useContext} from 'react';
import {Context} from "../index";
import Pagination from 'react-bootstrap/Pagination';

const Pages = () => {
    const {device} = useContext(Context)
    const pageCount = Math.ceil(device.totalCount / device.limit)
    //66п. Общее число товаров разделяем на лимит, ceil - округляет в большую сторону
    const pages = [];
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }//Через цикл добавляем +1 в массив
    return (
        <Pagination>
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={device.page ===page}//Если страница стора ровно текущей, то становиться активной
                    onClick={()=>device.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
};

export default Pages;