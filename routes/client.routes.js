const express = require('express');
const router = express.Router();

const clientController = require('../controllers/client.controller');

// Route pour ajouter un client
router.post('/', clientController.ajouterClient);

// Route pour obtenir la liste des clients
router.get('/', clientController.listerClients);

// Route pour obtenir un client par ID
router.get('/:id', clientController.getClientById);

// Route pour modifier un client
router.put('/:id', clientController.modifierClient);

// Route pour supprimer un client
router.delete('/:id', clientController.supprimerClient);

module.exports = router;
