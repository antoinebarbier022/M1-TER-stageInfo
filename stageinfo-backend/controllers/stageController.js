const Stage = require('../models/stageModel');

/**
 * @api {get} /stage Get all Stages
 * @apiName GetAllStage
 * @apiGroup Stage
 */
exports.getAllStage = ((req, res, next) => {
  Stage.find()
  .then(stages => res.status(200).json(stages))
  .catch(error => res.status(404).json({ error }));
});

/**
 * @api {get} /stage/:id Get a Stage
 * @apiName GetOneStage
 * @apiGroup Stage
 *
 * @apiParam {Number} id Stage's unique ID.
 *
 */
exports.getOneStage = ((req, res, next) => {
  Stage.findOne({
    _id: req.params.id
  })
  .then(stage => res.status(200).json(stage))
  .catch(error => res.status(404).json({ error }))
});

/**
 * @api {get} /stage Get Stage by keyword
 * @apiName getStageByKeyword
 * @apiGroup Stage
 */
exports.getStageByKeyword = ((req, res, next) => {

  let keyword = req.params.keyword;

  Stage.find(
    {
      "titre": {$regex: `^.*${keyword}.*$`, $options: "i"},
      "entreprise.nomComplet": {$regex: `^.*${keyword}.*$`, $options: "i"},
      "parcours.nomComplet": {$regex: `^.*${keyword}.*$`, $options: "i"},
      "etat": {$regex: `^.*${keyword}.*$`, $options: "i"}
    }
  )
  .then(stages => res.status(200).json(stages))
  .catch(error => res.status(404).json({ error }));
});

/**
 * @api {post} /stage Create a new Stage
 * @apiName CreateStage
 * @apiGroup Stage
 */
exports.createStage = (req, res, next) => {
  console.log(req.body);

  const stage = new Stage({
    titre: req.body.titre,
    description: req.body.description,
    duree: req.body.duree,
    dateDebut: req.body.date,
    etat: req.body.etat,
    rapport: req.body.rapport,
    fichier: req.body.fichier,
    conditions: req.body.conditions,
    objectif: req.body.objectif,
    avantages: req.body.avantages,
    datePropose: req.body.datePropose,
    dateValide: req.body.dateValide,
    resume: req.body.resume,
    niveauRequis: req.body.niveauRequis,

    commentaires: [], // lors de la création du stage, il n'y a aucun commentaire

    ficheSuivi: {
      dateDebut: req.body.dateDebut,
      dateFin: req.body.dateFin,
      commentaireBilan: req.body.commentaireBilan,
      embauche: req.body.embauche,
      commentaireEmbauche: req.body.commentaireEmbauche,
      dateFiche: req.body.dateFiche
    },

    noteStage: {
      date: req.body.dateNoteStage,
      valeur: req.body.noteStage,
      commentaire: req.body.commentaireNoteStage
    },

    parcours: {
      idParcours: req.body.idParcours,
      nomComplet: req.body.nomCompletParcours
    },

    ajouteur: {
      idAjouteur: req.body.idAjouteur,
      nomComplet: req.body.nomCompletAjouteur
    },

    entreprise: {
      idEntreprise: req.body.idEntreprise,
      nomComplet: req.body.nomCompletEntreprise
    },

    tuteurUniv: {
      idTuteurUniv: req.body.idTuteurUniv,
      nomComplet: req.body.nomCompletTuteurUniv
    },

    tuteurEntreprise: {
      idTuteurEntreprise: req.body.idTuteurEntreprise,
      nomComplet: req.body.nomCompletTuteurEntreprise
    },

    rapporteur: {
      idRapporteur: req.body.idRapporteur,
      nomComplet: req.body.nomCompletRapporteur
    },

    etudiant: {
      idEtudiant: req.body.idEtudiant,
      nomComplet: req.body.nomCompletEtudiant
    },

    idVisite: {
      typeContact: req.body.typeContact,
      dateVisite: req.body.dateVisite,
      commentaire: req.body.commentaireVisite
    }

  });

  stage.save()
    .then(() => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    })
    .catch((error) => { res.status(400).json({ error: error});});
};

/**
 * @api {put} /stage/:id Edit a Stage
 * @apiName EditStage
 * @apiGroup Stage
 *
 * @apiParam {Number} id Stage's unique ID.
 */
exports.editStage = (req, res, next) => {
  console.log(req.body);

  const stage = new Stage({
    _id: req.params.id,
    titre: req.body.titre,
    description: req.body.description,
    duree: req.body.duree,
    dateDebut: req.body.date,
    etat: req.body.etat,
    rapport: req.body.rapport,
    fichier: req.body.fichier,
    conditions: req.body.conditions,
    objectif: req.body.objectif,
    avantages: req.body.avantages,
    datePropose: req.body.datePropose,
    dateValide: req.body.dateValide,
    resume: req.body.resume,
    niveauRequis: req.body.niveauRequis,

    ficheSuivi: {
      dateDebut: req.body.dateDebut,
      dateFin: req.body.dateFin,
      commentaireBilan: req.body.commentaireBilan,
      embauche: req.body.embauche,
      commentaireEmbauche: req.body.commentaireEmbauche,
      dateFiche: req.body.dateFiche
    },

    noteStage: {
      date: req.body.dateNoteStage,
      valeur: req.body.noteStage,
      commentaire: req.body.commentaireNoteStage
    },

    parcours: {
      idParcours: req.body.idParcours,
      nomComplet: req.body.nomCompletParcours
    },

    ajouteur: {
      idAjouteur: req.body.idAjouteur,
      nomComplet: req.body.nomCompletAjouteur
    },

    entreprise: {
      idEntreprise: req.body.idEntreprise,
      nomComplet: req.body.nomCompletEntreprise
    },

    tuteurUniv: {
      idTuteurUniv: req.body.idTuteurUniv,
      nomComplet: req.body.nomCompletTuteurUniv
    },

    tuteurEntreprise: {
      idTuteurEntreprise: req.body.idTuteurEntreprise,
      nomComplet: req.body.nomCompletTuteurEntreprise
    },

    rapporteur: {
      idRapporteur: req.body.idRapporteur,
      nomComplet: req.body.nomCompletRapporteur
    },

    etudiant: {
      idEtudiant: req.body.idEtudiant,
      nomComplet: req.body.nomCompletEtudiant
    },

    idVisite: {
      typeContact: req.body.typeContact,
      dateVisite: req.body.dateVisite,
      commentaire: req.body.commentaireVisite
    }

  });

  Stage.updateOne({_id: req.params.id}, stage)
    .then(() => {
      res.status(201).json({
        message: 'Stage updated successfully!'
      });
    })
    .catch((error) => { res.status(400).json({ error: error});});
};

/**
 * @api {delete} /stage Delete a stage
 * @apiName DeleteOneStage
 * 
 * @apiGroup Stage
 *
 * @apiParam {Number} id Stage's unique ID.
 */
exports.deleteOneStage = (req, res, next) => {
  Stage.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Stage deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

/**
 * @api {delete} /stage Delete all stages
 * @apiName DeleteAllStage
 * @apiGroup Stage
 *
 */
exports.deleteAllStage = (req, res, next) => {
  Stage.deleteMany({}).then(
    () => {
      res.status(200).json({
        message: 'All Stages deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
