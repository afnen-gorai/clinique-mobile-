const path = require('path');
const dbPath = path.resolve(__dirname, '../reparation.db');
console.log("Utilisation de la BDD SQLite :", dbPath);
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dbPath, err => {
  if (err) console.error("Erreur connexion BDD:", err);
  else console.log("Connecté à la base SQLite.");
});
module.exports = db;
