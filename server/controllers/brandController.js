const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError');
//
class BrandController {//30п.
     async create(req, res) {
         const {name} = req.body
         const brand = await Brand.create({name})
        return res.json(brand)
     }
//
     async getAll(req, res) {//30п.
         const brands = await Brand.findAll()
         return res.json(brands)
     }
//
 }
//
 module.exports = new BrandController()//30п.