
const express = require('express');
const router = express.Router();// Create a router for all request of sauce

const sauceCtrl = require('../controllers/sauce'); // Import the sauceCtrl 
const auth = require('../middleware/auth'); // Import the auth middleware for protect the routes
const multer = require('../middleware/multer-config'); // Import the multer middleware for upload the files "images"


router.post('/', auth, multer, sauceCtrl.createSauce); // POST request to create a sauce

router.put('/:id', auth, multer, sauceCtrl.modifySauce); // PUT request to modify a sauce

router.delete('/:id', auth, sauceCtrl.deleteSauce); // DELETE request to delete a sauce

router.get('/:id', auth, sauceCtrl.getOneSauce); // GET request to get one sauce

router.get('/', auth, sauceCtrl.getAllSauces); // GET request to get all sauces

router.post("/:id/like", auth, sauceCtrl.likeAndDislike)// POST request to like and dislike a sauce



module.exports = router;
