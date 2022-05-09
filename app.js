
const express = require('express'); // Import express to use the router function 
const bodyParser = require('body-parser');// Import body-parser to use the body of the request

const mongoose = require('mongoose'); // Import mongoose to use the mongoose.connect function 
const path = require('path');// Path is a module that helps us to get the path of the server

const sauceRoutes = require('./routes/sauce'); // Define the sauceRoutes variable to use the sauceRoutes file
const userRoutes = require('./routes/user'); // Define the userRoutes variable to use the userRoutes file

require('dotenv').config();// Dotenv is a module that helps us to get the environment variables

//_______________________________________________________ SECURITY

const limiter = require("./middleware/rateLimit"); // Import the rateLimit middleware to limit the number of requests per IP "BRUTE FORCE"
const helmet = require("helmet");// Import helmet to secure the server with some headers (security)


//________________________________________________ VARIABLES .env

const sauce = process.env.DB_USER// User name of the database
const piiquante = process.env.DB_PASSWORD// Password of the database
const hotTaste = process.env.DB_NAME// Database name

//_______________________________________ DATABASE connection

mongoose.connect(`mongodb+srv://${sauce}:${piiquante}@cluster0.hrftw.mongodb.net/${hotTaste}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
//.then(() => console.log('* Connexion à MongoDB réussie *'))
// .catch((err) => console.log('Connexion à MongoDB échouée ', err));


const app = express();// Express is a function that creates an express application

app.use((req, res, next) => {// Add the header Access-Control-Allow-Origin to allow the frontend to access the server
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(helmet());
app.use(bodyParser.json());// Use body-parser to parse the body of the request
app.use('/images', express.static(path.join(__dirname, 'images'))); // Use express.static to serve the images

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', limiter, userRoutes);


module.exports = app;// Export app to serve it in the server.js file