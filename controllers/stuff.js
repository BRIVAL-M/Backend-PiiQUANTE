
const Sauce = require('../models/Sauce');
const fs = require('fs');


exports.createSauce = (req, res, next) => {

  const sauce = JSON.parse(req.body.sauce);
  const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

  console.log("imageUrl =", imageUrl);

  const { userId, name, description, manufacturer, mainPepper, heat } = sauce;
  console.log("Sauce =", sauce);
  console.log({ body: req.body.sauce });
  console.log({ file: req.file });

  const sauceData = new Sauce({
    userId,
    name,
    description,
    manufacturer,
    mainPepper,
    imageUrl,
    heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    sauce: sauce
  });
  sauceData.save()
    .then(() => res.status(201).json({ message: 'Sauce créé !' }))
    .catch(error => res.status(400).json({ error }));
}

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }

  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(res.status(200).json({ message: "Sauce modifiée" }))
    .catch(error => res.status(400).json({ error }))
}

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split("/images/")[1]
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(res.status(200).json({ message: "Sauce supprimée" }))
          .catch(error => res.status(400).json({ error }))

      })
    })
    .catch(error => res.status(500).json({ error }))

}

exports.getOneSauce = (req, res, next) => { // l'utilisateur envoie une requête GET vers /api/stuff))
  Sauce.findOne({ _id: req.params.id }) // on récupère l'objet avec l'id passé en paramètre
    .then(sauce => res.status(200).json(sauce)) // on renvoie le résultat de la récupération
    .catch(error => res.status(404).json({ error })); // si la récupération échoue, on renvoie un statut 404 avec un message d'erreur
}

exports.getAllSauces = (req, res, next) => {
  Sauce.find() // on récupère tous les objets sauces
    .then(sauces => res.status(200).json(sauces)) // on renvoie le résultat
    .catch(error => res.status(400).json({ error })); // si la récupération échoue, on renvoie un statut 400 avec un message d'erreur
}

//_______________________________________________ Like and Dislike 

exports.likeAndDislike = (req, res, next) => {
  let like = req.body.like
  let userId = req.body.userId
  let sauceId = req.params.id

  switch (like) {
    case 1:
      Sauce.updateOne({ _id: sauceId }, { $push: { usersLiked: userId }, $inc: { likes: +1 } })
        .then(() => res.status(200).json({ message: `J'aime` }))
        .catch((error) => res.status(400).json({ error }))

      break;

    case 0:
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

    case -1:
      Sauce.updateOne({ _id: sauceId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } })
        .then(() => { res.status(200).json({ message: `Je n'aime pas` }) })
        .catch((error) => res.status(400).json({ error }))
      break;

    default:
      console.log(error);
  }
}


