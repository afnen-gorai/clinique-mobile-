const express = require('express');
const router = express.Router();
const rdvController = require('../controllers/rdv.controller');

router.post('/', rdvController.ajouterRdv);
router.get('/', rdvController.listerRdv);

module.exports = router;
