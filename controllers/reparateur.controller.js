const Reparateur = require('../models/reparateur.model');
const data = require('../config/reparateurs');


exports.ajouterReparateur = (req, res) => {
  const { nom, specialites, prix } = req.body;

  // Parsing JSON si specialites et prix sont des chaînes JSON reçues
  let parsedSpecialites = [];
  let parsedPrix = {};
  try {
    parsedSpecialites = typeof specialites === 'string' ? JSON.parse(specialites) : specialites;
    parsedPrix = typeof prix === 'string' ? JSON.parse(prix) : prix;
  } catch(e) {
    return res.status(400).json({ message: "Format JSON invalide pour specialites ou prix" });
  }

  if (!nom || !Array.isArray(parsedSpecialites) || typeof parsedPrix !== 'object') {
    return res.status(400).json({ message: "Champs invalides ou manquants" });
  }

  Reparateur.ajouter({ nom, specialites: parsedSpecialites, prix: parsedPrix }, (err, id) => {
    if (err) {
      console.error("Erreur ajout réparateur:", err.message);
      return res.status(500).json({ message: "Erreur ajout réparateur", detail: err.message });
    }
    res.status(201).json({ message: "Réparateur ajouté", id });
  });
};



exports.listerReparateurs = (req, res) => {
  Reparateur.lister((err, reparateurs) => {
    if (err) {
      console.error('Erreur récupération réparateurs:', err);
      return res.status(500).json({ message: "Erreur récupération réparateurs" });
    }
    res.json(reparateurs);
  });
};

exports.getReparateurById = (req, res) => {
  Reparateur.getById(req.params.id, (err, reparateur) => {
    if (err) {
      console.error('Erreur récupération réparateur:', err);
      return res.status(500).json({ message: "Erreur récupération réparateur" });
    }
    if (!reparateur) return res.status(404).json({ message: "Réparateur non trouvé" });
    res.json(reparateur);
  });
};

exports.modifierReparateur = (req, res) => {
  Reparateur.modifier(req.params.id, req.body, (err) => {
    if (err) {
      console.error('Erreur modification réparateur:', err);
      return res.status(500).json({ message: "Erreur modification réparateur" });
    }
    res.json({ message: "Réparateur modifié" });
  });
};

exports.supprimerReparateur = (req, res) => {
  Reparateur.supprimer(req.params.id, (err) => {
    if (err) {
      console.error('Erreur suppression réparateur:', err);
      return res.status(500).json({ message: "Erreur suppression réparateur" });
    }
    res.json({ message: "Réparateur supprimé" });
  });
};
