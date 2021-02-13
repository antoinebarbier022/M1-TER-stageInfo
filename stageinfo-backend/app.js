const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

// Importation des routes
const stageRoutes = require('./routes/stageRoutes');
const salleRoutes = require('./routes/salleRoutes');

const app = express();

mongoose.connect('mongodb+srv://root:toor@cluster0.ibztb.mongodb.net/Stage?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
app.use(express.urlencoded());

app.use('/api/stage', stageRoutes);
app.use('/api/salle', salleRoutes);


module.exports = app;