const db = require('./config/database');

db.serialize(() => {
  // Drop tables pour reset si besoin
  db.run(`DROP TABLE IF EXISTS rdv`);
  db.run(`DROP TABLE IF EXISTS clients`);
  db.run(`DROP TABLE IF EXISTS reparateurs`);

  db.run(`CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT,
    email TEXT,
    telephone TEXT,
    pannes TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS reparateurs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT,
    specialites TEXT, -- JSON string ou texte séparé par virgule
    telephone TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS rdv (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER,
    reparateur_id INTEGER,
    date TEXT,
    description TEXT,
    FOREIGN KEY(client_id) REFERENCES clients(id),
    FOREIGN KEY(reparateur_id) REFERENCES reparateurs(id)
  )`);
});

console.log('Tables créées avec clients, réparateurs et rendez-vous');
