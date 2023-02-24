//18п.
import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []// '_' - условная договор, что эта переменная изменяться не может/ Временны объекты
        this._brands = []
        this._devices = []
        this._selectedType = {}//26п.Для хранения выбранного типа
        this._selectedBrand ={}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }
    setTypes(types){
        this._types = types
    }
    setBrands(brands){
        this._brands = brands
    }
    setDevices(devices){
        this._devices = devices
    }
    setSelectedType(type) {//26п. Необходима выделить типа при нажатии на него.
        this.setPage(1)//67п. При выборе типа, возвращаться на 1 страницу
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)//67п. При выборе брэнда, возвращаться на 1 страницу
        this._selectedBrand = brand
    }
    setPage(page) {//63п.
        this._page = page
    }
    setTotalCount(count) {//
        this._totalCount = count
    }//63п.
    get types(){
        return this._types
    }
    get brands(){
        return this._brands
    }
    get devices(){
        return this._devices
    }
    get selectedType() {//26п.
        return this._selectedType
    }
    get selectedBrand() {//26п.
        return this._selectedBrand
    }
    get totalCount() {//63п.
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }//63п.
}

