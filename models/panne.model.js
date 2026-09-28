const db = require('../config/database');

const Client = {
  ajouter: (data, callback) => {
    const { nom, email, telephone, pannes } = data;
    const pannesJSON = JSON.stringify(pannes || []); // convertit tableau pannes en string JSON

    const sql = `INSERT INTO clients (nom, email, telephone, pannes) VALUES (?, ?, ?, ?)`;
    db.run(sql, [nom, email, telephone, pannesJSON], function(err) {
      callback(err, this ? this.lastID : null);
    });
  },

  lister: (callback) => {
    const sql = `SELECT * FROM clients`;
    db.all(sql, [], (err, rows) => {
      if (err) return callback(err);

      // Pour chaque client, convertir la chaîne JSON en objet JavaScript
      rows.forEach(row => {
        try {
          row.pannes = JSON.parse(row.pannes || '[]');
        } catch (e) {
          row.pannes = [];
        }
      });

      callback(null, rows);
    });
  }
};

module.exports = Client;
