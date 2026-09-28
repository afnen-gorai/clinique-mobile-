const db = require('../config/database');

const Reparateur = {
  ajouter: (data, callback) => {
    const { nom, telepone ,specialites, prix } = data;
    const specialitesJSON = JSON.stringify(specialites || []);
    const prixJSON = JSON.stringify(prix || {});
   const sql = `INSERT INTO reparateurs (nom, specialites, prix) VALUES (?, ?, ?)`;

db.run(sql, [nom, specialitesJSON, prixJSON], function (err) {
  callback(err, this ? this.lastID : null);
});
  },

  lister: (callback) => {
    const sql = `SELECT * FROM reparateurs`;
    db.all(sql, [], (err, rows) => {
      if (err) return callback(err);
      rows.forEach(row => {
        try {
          row.specialites = JSON.parse(row.specialites || '[]');
        } catch {
          row.specialites = [];
        }
        try {
          row.prix = JSON.parse(row.prix || '{}');
        } catch {
          row.prix = {};
        }
      });
      callback(null, rows);
    });
  },

  getById: (id, callback) => {
    const sql = `SELECT * FROM reparateurs WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      if (err) return callback(err);
      if (!row) return callback(null, null);
      try {
        row.specialites = JSON.parse(row.specialites || '[]');
      } catch {
        row.specialites = [];
      }
      try {
        row.prix = JSON.parse(row.prix || '{}');
      } catch {
        row.prix = {};
      }
      callback(null, row);
    });
  },

  modifier: (id, data, callback) => {
    const { nom, telephone, specialites, prix } = data;
    const specialitesJSON = JSON.stringify(specialites || []);
    const prixJSON = JSON.stringify(prix || {});
    const sql = `UPDATE reparateurs SET nom = ?, specialites = ?, prix = ? WHERE id = ?`;
    db.run(sql, [nom, telephone, specialitesJSON, prixJSON, id], callback);
  },

  supprimer: (id, callback) => {
    const sql = `DELETE FROM reparateurs WHERE id = ?`;
    db.run(sql, [id], callback);
  }
};

module.exports = Reparateur;
