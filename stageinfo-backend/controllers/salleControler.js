const Salle = require('../models/salleModel');

// Récupération de toutes les salles
exports.getAllSalle = ((req, res, next) => {
    Salle.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

// Ajout d'une salle
exports.postSalle = ((req, res, next) => {

    console.log("(Requete POST) Salle : OK");
    console.log(req.body);
  
    // Récupération des inputs utilisateur
    const salle = new Salle({
      nom: req.body.nom,
      batiment: req.body.batiment,
      capacite: req.body.capacite,
      commentaire: req.body.commentaire
    });

    // Envoi dans la bdd
    salle.save()
        .then(() => res.status(201).json({
            message: 'La Salle a bien été envoyé'
        }))
        .catch(error => res.status(400).json({error: error}));
  });