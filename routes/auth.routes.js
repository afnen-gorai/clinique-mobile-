const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/login/admin', authController.loginAdmin);
router.post('/login/reparateur', authController.loginReparateur);

module.exports = router;
