
const Sauce = require('../models/Sauce'); // Import sauce model
const fs = require('fs');// Fs is required to delete the image from the folder when we delete the sauce

exports.createSauce = (req, res, next) => { // Create a new sauce 

  const sauce = JSON.parse(req.body.sauce);
  const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

  const { userId, name, description, manufacturer, mainPepper, heat } = sauce;

  Sauce.create({// Create a new sauce with the data we receive
    userId,
    name,
    description,
    manufacturer,
    mainPepper,
    heat,
    imageUrl,
    heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  })
    .then(() => {
      res.status(201).json({ message: 'Sauce créée !' });
    })
    .catch(error => {
      fs.unlink(req.file.path, () => {
        res.status(500).json({ error });
      });
    });
}

// const sauceData = new Sauce({// Sauce data is a new instance of the Sauce model with the data we received
//   userId,
//   name,
//   description,
//   manufacturer,
//   mainPepper,
//   imageUrl,
//   heat,
//   likes: 0,
//   dislikes: 0,
//   usersLiked: [],
//   usersDisliked: [],
//   sauce: sauce
// });

// sauceData.save()// The new instance is saved in the database
//   .then(() => res.status(201).json({ message: 'Sauce créé !' }))
//   .catch(error => res.status(400).json({ error }));
// }



exports.modifySauce = (req, res, next) => { // ModifySauce is a function that modifies the sauce with the data we receive

const sauceObject = req.file ? 

    {
      ...JSON.parse(req.body.sauce),

      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

    } : { ...req.body,
    };

  Sauce.findByIdAndUpdate({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })

    .then(sauce => {
     
     if (req.file) {
        const filename = sauce.imageUrl.split("/images/")[1]
        fs.unlink(`images/${filename}`, () => {
          res.status(200).json({ message: 'Sauce modifiée !' });
        });
      } else {
        res.status(200).json({ message: 'Sauce modifiée !' });
      }
    })
    .catch(error => res.status(500).json({ error }))
}


exports.deleteSauce = (req, res, next) => { // DeleteSauce is a function that deletes the sauce with the id we receive

  Sauce.findByIdAndDelete(req.params.id)
    .then(sauce => {
      const filename = sauce.imageUrl.split("/images/")[1]
      fs.unlink(`images/${filename}`, () => {
        res.status(200).json({ message: "Sauce supprimée" })
      })
    })
    .catch(error => res.status(500).json({ error }))
}

exports.getOneSauce = (req, res, next) => { // GetOneSauce is a function that returns the sauce with the id we receive
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
}

//_______________________________________________ LIKE AND DISLIKE  

exports.likeAndDislike = (req, res, next) => { // LikeAndDislike is a function that adds or removes a like or dislike to the sauce with the id we receive
  let like = req.body.like
  let userId = req.body.userId
  let sauceId = req.params.id

  switch (like) { // Switch is used to add or remove a like or dislike
    case 1:// Case 1 is used to add a like
      Sauce.updateOne({ _id: sauceId }, { $push: { usersLiked: userId }, $inc: { likes: +1 } })
        .then(() => res.status(200).json({ message: `J'aime` }))
        .catch((error) => res.status(400).json({ error }))

      break;// Break is used to stop the switch

    case 0: // Case 0 is used to remove a like
      Sauce.findOne({ _id: sauceId })
        .then((sauce) => {
          if (sauce.usersLiked.includes(userId)) {
            Sauce.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
              .then(() => res.status(200).json({ message: `Neutre` }))
              .catch((error) => res.status(400).json({ error }))
          }
          if (sauce.usersDisliked.includes(userId)) {
            Sauce.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
              .then(() => res.status(200).json({ message: `Neutre` }))
              .catch((error) => res.status(400).json({ error }))
          }
        })
        .catch((error) => res.status(404).json({ error }))
      break;

    case -1:// Case -1 is used to add a dislike
      Sauce.updateOne({ _id: sauceId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } })
        .then(() => { res.status(200).json({ message: `Je n'aime pas` }) })
        .catch((error) => res.status(400).json({ error }))
      break;

    default:// Default is used to remove a dislike

  }
}




