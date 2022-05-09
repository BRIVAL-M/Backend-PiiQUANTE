
const bcrypt = require('bcrypt');// Crypt the password 
const jwt = require('jsonwebtoken'); // Jwt token middleware creates a token for the user and send it to the client
const User = require('../models/User');


require('dotenv').config();

exports.signup = (req, res, next) => {

  bcrypt.hash(req.body.password, 10) // Hash the password 
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

}

exports.login = (req, res, next) => { // Login the user and create a token for him

  User.findOne({ email: req.body.email })

    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)// compare the password with the hash
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }

          res.status(200).json({

            userId: user._id,
            token: jwt.sign( // Create a token for the user
              { userId: user._id },
              process.env.JWT_PWD,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//User.deleteMany({}).then(() => console.log("Users deleted !")); // delete all users in the database







