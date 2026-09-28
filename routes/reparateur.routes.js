const express = require('express');
const router = express.Router();
const reparateurController = require('../controllers/reparateur.controller');
//const { verifyToken, authorizeRoles } = require('../middlewares/auth.middleware');

// Routes admin (avec middleware auth désactivé pour test ou debug)
// router.post('/admin', verifyToken, authorizeRoles('admin', 'reparateur'), reparateurController.ajouterReparateur);
// router.put('/admin/:id', verifyToken, authorizeRoles('admin', 'reparateur'), reparateurController.modifierReparateur);
// router.delete('/admin/:id', verifyToken, authorizeRoles('admin', 'reparateur'), reparateurController.supprimerReparateur);

// Routes admin sans authentification (décommenter pour désactiver auth)
router.post('/admin', reparateurController.ajouterReparateur);
router.put('/admin/:id', reparateurController.modifierReparateur);
router.delete('/admin/:id', reparateurController.supprimerReparateur);


module.exports = router;
