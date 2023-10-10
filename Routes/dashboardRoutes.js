const express = require('express')
const router = express.Router()
const {ensureAuthentication} = require("../Middlewares/authMiddleware");
const ViewController = require('../Controllers/viewController');
const viewController = new ViewController();

router.get('/', ensureAuthentication, viewController.toDashboardStatics)

module.exports = router