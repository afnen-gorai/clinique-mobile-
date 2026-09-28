const Client = require('../models/client.model');
const reparateurs = require('../config/reparateurs'); // ✅ importation



function enleverAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

exports.ajouterClient = (req, res) => {
  const { nom, email, telephone, pannes } = req.body;

  Client.ajouter({ nom, email, telephone, pannes }, (err, id) => {
    if (err) {
      console.error('Erreur ajout client:', err);
      return res.status(500).json({ message: "Erreur lors de l'ajout du client" });
    }

    const reparateursProposes = (pannes || []).map(panneObj => {
      const panneDescOriginale = panneObj.description;
      const panneDesc = enleverAccents(panneDescOriginale.toLowerCase());

      const reparateursTrouves = reparateurs.filter(r =>
        r.specialites.some(s => panneDesc.includes(enleverAccents(s.toLowerCase())))
      );

      const reparateursAvecPrix = reparateursTrouves.map(r => {
        const clePrix = Object.keys(r.prix).find(k => panneDesc.includes(enleverAccents(k.toLowerCase())));
        const prix = clePrix ? r.prix[clePrix] : null;
        return {
          id: r.id,
          nom: r.nom,
          specialites: r.specialites,
          prix,
        };
      });

      return {
        panne: panneDescOriginale,
        reparateurs: reparateursAvecPrix,
      };
    });

    res.status(201).json({
      message: `Client ajouté avec ID : ${id}`,
      id,
      reparateursProposes,
    });
  });
};

exports.listerClients = (req, res) => {
  Client.lister((err, rows) => {
    if (err) {
      console.error('Erreur récupération clients:', err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    res.json(rows);
  });
};

exports.getClientById = (req, res) => {
  const id = req.params.id;
  Client.getById(id, (err, client) => {
    if (err) {
      console.error('Erreur get client:', err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    if (!client) {
      return res.status(404).json({ message: "Client non trouvé" });
    }
    res.json(client);
  });
};

exports.modifierClient = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  Client.modifier(id, data, (err) => {
    if (err) {
      console.error('Erreur modification client:', err);
      return res.status(500).json({ message: "Erreur lors de la modification" });
    }
    res.json({ message: "Client modifié avec succès" });
  });
};

exports.supprimerClient = (req, res) => {
  const id = req.params.id;
  Client.supprimer(id, (err) => {
    if (err) {
      console.error('Erreur suppression client:', err);
      return res.status(500).json({ message: "Erreur lors de la suppression" });
    }
    res.json({ message: "Client supprimé avec succès" });
  });
};
