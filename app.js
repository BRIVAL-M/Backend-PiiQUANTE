const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const path = require('path');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

require('dotenv').config();

//________________________________________________ Variables d'environnement

const sauce = process.env.DB_USER
const piiquante = process.env.DB_PASSWORD
const hotTaste = process.env.DB_NAME

//_______________________________________ Database

mongoose.connect(`mongodb+srv://${sauce}:${piiquante}@cluster0.hrftw.mongodb.net/${hotTaste}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('* Connexion à MongoDB réussie *'))
  .catch((err) => console.log('Connexion à MongoDB échouée ', err));


const app = express();
//Avec ceci, Express prend toutes les requêtes qui ont comme Content-Type  application/json  
//et met à disposition leur  body  directement sur l'objet req

//Ces headers permettent : ( setHeader('Access-Control-Allow-Origin', '*'); )...
//d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
//d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
//d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(bodyParser.json());// pour que le body parser puisse parser les requêtes
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', stuffRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;