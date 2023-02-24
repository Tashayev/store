const Router = require('express')//21п.
const router = new Router()
const brandController = require('../controllers/brandController')

router.post('/', brandController.create) // Post - для того чтобы создавать //37п. параметр
router.get('/', brandController.getAll)// Get - для того чтобы получать.

module.exports = router