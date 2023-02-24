//52п.
import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}//52п.  Создание типа доступ имеет только админ

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}//52п. Получать типы может каждый

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}
//55п. Так же и с брэндами, девайсами

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand' )
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}
// 64п. Передаем параметры, где получаем устройства
export const fetchDevices = async (typeId, brandId, page, limit= 5) => {
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit//если запросы не пусты, эти параметры на автомете подставляются
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}