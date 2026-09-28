const db = require('../config/database');
const reparateursStatiques = require('../config/reparateurs'); // liste statique

// ✅ Lister tous les clients
exports.listerClients = (req, res) => {
  db.all('SELECT * FROM clients', [], (err, rows) => {
    if (err) {
      console.error("❌ Erreur clients :", err);
      return res.status(500).json({ message: "Erreur récupération des clients", err });
    }
    res.json(rows);
  });
};

// ✅ Lister les réparateurs : base + statiques
exports.listerReparateurs = (req, res) => {
  db.all('SELECT * FROM reparateurs', [], (err, rows) => {
    if (err) {
      console.error("❌ Erreur BDD réparateurs:", err);
      return res.status(500).json({ message: "Erreur réparateurs", err });
    }

    // Ici on parse specialites et prix car ce sont des JSON dans la BDD (si tu veux stocker en string brut, adapte ici)
    const reparateursBDD = rows.map(r => {
      try {
        r.specialites = JSON.parse(r.specialites || '[]');
      } catch (e) {
        console.warn("⚠️ Erreur parsing specialites:", r.specialites);
        r.specialites = [];
      }
      try {
        r.prix = JSON.parse(r.prix || '{}');
      } catch (e) {
        console.warn("⚠️ Erreur parsing prix:", r.prix);
        r.prix = {};
      }
      return r;
    });

    const total = [...reparateursStatiques, ...reparateursBDD];
    res.json(total);
  });
};

// ✅ Ajouter un réparateur (stockage en chaînes brutes, sans JSON.stringify)
exports.ajouterReparateur = (req, res) => {
  const { nom, specialites, prix } = req.body;

  if (!nom || !Array.isArray(specialites) || typeof prix !== 'object') {
    return res.status(400).json({ message: "Champs requis manquants ou invalides" });
  }

  const sql = `INSERT INTO reparateurs (nom, specialites, prix) VALUES (?, ?, ?)`;
  db.run(sql, [nom, JSON.stringify(specialites), JSON.stringify(prix)], function (err) {
    if (err) {
      console.error("Erreur insertion réparateur:", err.message);
      return res.status(500).json({ message: "Erreur ajout réparateur", err: err.message });
    }
    res.status(201).json({ message: "Réparateur ajouté", id: this.lastID });
  });
};


// ✅ Supprimer un réparateur (base uniquement)
exports.supprimerReparateur = (req, res) => {
  const id = parseInt(req.params.id);

  db.run('DELETE FROM reparateurs WHERE id = ?', [id], function (err) {
    if (err) {
      console.error("❌ Erreur suppression réparateur:", err);
      return res.status(500).json({ message: "Erreur suppression", err });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: "Réparateur introuvable ou statique" });
    }

    res.json({ message: "✅ Réparateur supprimé avec succès" });
  });
};

// ✅ Liste des RDV
exports.listerRDV = (req, res) => {
  const sql = `
    SELECT rdv.*, c.nom AS client_nom, r.nom AS reparateur_nom
    FROM rdv
    JOIN clients c ON rdv.client_id = c.id
    JOIN reparateurs r ON rdv.reparateur_id = r.id
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("❌ Erreur RDV :", err);
      return res.status(500).json({ message: "Erreur récupération des RDV", err });
    }
    res.json(rows);
  });
};

// ✅ Supprimer un RDV
exports.supprimerRDV = (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM rdv WHERE id = ?', [id], function (err) {
    if (err) {
      console.error("❌ Erreur suppression RDV :", err);
      return res.status(500).json({ message: "Erreur suppression RDV", err });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: "RDV introuvable" });
    }

    res.json({ message: "✅ RDV supprimé avec succès" });
  });
};
