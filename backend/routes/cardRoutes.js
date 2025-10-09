const express = require('express')
const router = express.Router()
const cardController = requie('../controllers/cardController')

router.get('/', cardController.getAllcards)
router.post('/buy', cardController.buyCard)
router.get('/owned/:userUD', cardController.getOwnedCards)

module.exports = router