const db = require('../config/database');

const Client = {
  // Ajouter un client
  ajouter: (data, callback) => {
    const { nom, email, telephone, pannes } = data;
    const pannesJSON = JSON.stringify(pannes || []);
    const sql = `INSERT INTO clients (nom, email, telephone, pannes) VALUES (?, ?, ?, ?)`;
    db.run(sql, [nom, email, telephone, pannesJSON], function(err) {
      if (err) return callback(err);
      callback(null, this.lastID);
    });
  },

  // Lister tous les clients
  lister: (callback) => {
    const sql = `SELECT * FROM clients`;
    db.all(sql, [], (err, rows) => {
      if (err) return callback(err);
      rows.forEach(row => {
        try {
          row.pannes = JSON.parse(row.pannes || '[]');
        } catch {
          row.pannes = [];
        }
      });
      callback(null, rows);
    });
  },

  // Obtenir un client par ID
  getById: (id, callback) => {
    const sql = `SELECT * FROM clients WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      if (err) return callback(err);
      if (!row) return callback(null, null);
      try {
        row.pannes = JSON.parse(row.pannes || '[]');
      } catch {
        row.pannes = [];
      }
      callback(null, row);
    });
  },

  // Modifier un client
  modifier: (id, data, callback) => {
    const { nom, email, telephone, pannes } = data;
    const pannesJSON = JSON.stringify(pannes || []);
    const sql = `UPDATE clients SET nom = ?, email = ?, telephone = ?, pannes = ? WHERE id = ?`;
    db.run(sql, [nom, email, telephone, pannesJSON, id], function(err) {
      callback(err);
    });
  },

  // Supprimer un client
  supprimer: (id, callback) => {
    const sql = `DELETE FROM clients WHERE id = ?`;
    db.run(sql, [id], function(err) {
      callback(err);
    });
  }
};

module.exports = Client;
