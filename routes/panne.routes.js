const express = require('express');
const router = express.Router();
const panneController = require('../controllers/panne.controller');

router.post('/', panneController.ajouterPanne);
router.get('/', panneController.listerPannes);

module.exports = router;
