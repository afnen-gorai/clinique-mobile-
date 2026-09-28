const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
// const { verifyToken, authorizeRoles } = require('../middlewares/auth.middleware');

// On enlève la protection globale (plus besoin de vérifier token ni rôle)
// router.use(verifyToken);
// router.use(authorizeRoles('admin'));

// Routes admin désormais accessibles sans auth
router.get('/clients', adminController.listerClients);
router.get('/reparateurs', adminController.listerReparateurs);
router.post('/reparateurs', adminController.ajouterReparateur);
router.delete('/reparateurs/:id', adminController.supprimerReparateur);
router.get('/rdv', adminController.listerRDV);
router.delete('/rdv/:id', adminController.supprimerRDV);

module.exports = router;
