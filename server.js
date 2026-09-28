const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

// Routes
const clientRoutes = require('./routes/client.routes');
const reparateurRoutes = require('./routes/reparateur.routes');
const rdvRoutes = require('./routes/rdv.routes');
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes'); // ✅ ne pas répéter cette ligne

// Use routes
app.use('/api/clients', clientRoutes);
app.use('/api/reparateurs', reparateurRoutes);
app.use('/api/rdv', rdvRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes); // ✅ pour login admin et réparateur

app.get('/', (req, res) => {
  res.send('API Réparation Mobile en ligne ✅');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
