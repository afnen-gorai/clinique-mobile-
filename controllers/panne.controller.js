const Panne = require('../models/panne.model');

exports.ajouterPanne = (req, res) => {
  const panneData = req.body;
  Panne.ajouter(panneData, (err, id) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de l'ajout de la panne" });
    }
    res.status(201).json({ message: "Panne ajoutée", id });
  });
};

exports.listerPannes = (req, res) => {
  Panne.lister((err, pannes) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de la récupération des pannes" });
    }
    res.json(pannes);
  });
};
