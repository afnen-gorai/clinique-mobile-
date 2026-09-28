const Rdv = require('../models/rdv.model');

exports.ajouterRdv = (req, res) => {
  Rdv.ajouter(req.body, (err, id) => {
    if (err) {
      console.error('Erreur ajout RDV :', err);
      return res.status(500).json({ message: 'Erreur lors de l\'ajout du rendez-vous' });
    }
    console.log('RDV ajouté avec ID:', id);
    res.status(201).json({ message: 'Rendez-vous ajouté', id });
  });
};


exports.listerRdv = (req, res) => {
  Rdv.lister((err, rdvs) => {
    if (err) {
      console.error('Erreur récupération RDV :', err);
      return res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous' });
    }
    res.json(rdvs);
  });
};
