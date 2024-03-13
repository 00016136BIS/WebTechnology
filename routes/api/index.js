const express = require('express')
const Recipe_router = require('./Recipe')

const router = express.Router()

// registering child routers
router.use('/Recipe', Recipe_router)

module.exports = router