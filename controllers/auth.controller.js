const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// Utilisateurs simulés (en mémoire)
const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@admin.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: 2,
    username: 'reparateur1',
    email: 'rep@exemple.com',
    password: 'repa123',
    role: 'reparateur'
  }
];

// Fonction générique de login
const loginUser = (req, res, expectedRole) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }

  console.log(`Tentative login pour rôle: ${expectedRole}, email: ${email}`);

  const user = users.find(
    u => u.email === email && u.password === password && u.role === expectedRole
  );

  if (!user) {
    console.log('Identifiants invalides:', { email, expectedRole });
    return res.status(401).json({ message: `Identifiants ${expectedRole} invalides` });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  console.log(`Login réussi pour ${email}, token généré`);

  return res.json({
    token,
    role: user.role,
    username: user.username
  });
};

// Connexion admin
exports.loginAdmin = (req, res) => loginUser(req, res, 'admin');

// Connexion réparateur
exports.loginReparateur = (req, res) => loginUser(req, res, 'reparateur');
