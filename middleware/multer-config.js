// Configuration de multer (multer est un package de gestion de fichiers pour node.js)

const multer = require('multer');// sert à gérer les fichiers uploadés

// const MIME_TYPE ={ // sert à définir les types de fichiers autorisés
//     'image/png': 'png',
//     'image/jpeg': 'jpg',
//     'image/jpg': 'jpg'

// }; ________________________________________________EST-CE UTILE ?

const storage = multer.diskStorage({ // sert à définir le chemin d'enregistrement des fichiers
    destination:(req,file,cb)=>{ 
        cb(null,'images');
    },
    filename:(req,file,cb)=>{ // sert à définir le nom du fichier
        const name = file.originalname; // sépare les caractères d'un nom de fichier
       // const extension = MIME_TYPE[file.mimetype]; 
      // cb(null,name + Date.now() + '.' + extension); 
        cb(null,name + '_' + Date.now() + '.' + file.mimetype.split('/')[1]); 
     
    }

});
module.exports = multer({storage}).single('image');// exporte le middleware multer avec le storage défini précédemment 


////// Voir pour les - des noms des images ///////////////////////////////////////////////////////////////////////////////////////////////