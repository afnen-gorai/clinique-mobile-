const jwt = require('jsonwebtoken');

// Remplace 'ta_clef_secrete' par la clé secrète que tu utilises dans ton backend
const secret = 'ta_clef_secrete';

// Payload : ici un utilisateur admin fictif
const payload = {
  userId: 1,
  role: 'admin'
};

// Génération du token valable 1 heure
const token = jwt.sign(payload, secret, { expiresIn: '1h' });

console.log('Token JWT généré :', token);
