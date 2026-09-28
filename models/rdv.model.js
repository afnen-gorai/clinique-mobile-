const db = require('../config/database');

const Rdv = {
  ajouter: (data, callback) => {
    // Récupérer client_id / reparateur_id en acceptant camelCase ou snake_case
    const client_id = data.client_id || data.clientId;
    const reparateur_id = data.reparateur_id || data.reparateurId;
    const date = data.date;
    // Description peut venir en 'description' ou 'panne' selon frontend
    const description = data.description || data.panne;

    const sql = `INSERT INTO rdv (client_id, reparateur_id, date, description) VALUES (?, ?, ?, ?)`;
    db.run(sql, [client_id, reparateur_id, date, description], function(err) {
      callback(err, this ? this.lastID : null);
    });
  },

  lister: (callback) => {
    const sql = `
      SELECT rdv.*, clients.nom AS client_nom, reparateurs.nom AS reparateur_nom
      FROM rdv
      JOIN clients ON rdv.client_id = clients.id
      JOIN reparateurs ON rdv.reparateur_id = reparateurs.id
    `;
    db.all(sql, [], (err, rows) => {
      callback(err, rows);
    });
  }
};

module.exports = Rdv;
