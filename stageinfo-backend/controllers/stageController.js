const Stage = require('../models/stageModel');
const fs = require('fs');
const multer =require('../middleware/multer-config')

/**
 * @api {get} /stage Get all Stages
 * @apiName GetAllStage
 * @apiGroup Stage
 */
exports.getAllStage = ((req, res, next) => {
  Stage.find()
  .populate('commentaires')
  .populate('ficheSuivi')
  .populate('noteStage')
  .populate('visiteStage')

  .populate('entreprise')
  .populate('parcours', 'acronyme')

  .populate('ajouteur', 'nom prenom')
  .populate('repEntreprise', 'nom prenom')
  .populate('tuteur', 'nom prenom')
  .populate('rapporteur', 'nom prenom')
  .populate('etudiant', 'nom prenom')
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
  .populate('commentaires')
  .populate('ficheSuivi')
  .populate('noteStage')
  .populate('visiteStage')

  .populate('entreprise')
  .populate('parcours', 'acronyme')

  .populate('ajouteur', 'nom prenom')
  .populate('repEntreprise', 'nom prenom')
  .populate('tuteur', 'nom prenom')
  .populate('rapporteur', 'nom prenom')
  .populate('etudiant', 'nom prenom')

  .then(stage => res.status(200).json(stage))
  .catch(error => res.status(404).json({ error }))
});

// changement de l'état du stage
exports.editState = (req, res, next) => {
  var stage;
  switch (req.body.etat) {
    case 'valide':
      stage = {
        etat: req.body.etat,
        dateValide: req.body.etat == 'valide' ? new Date() : null,
      };
      break;
    case 'affectEtudiant':
        stage = {
          etat: req.body.etat,
          etudiant: req.body.etudiant,
        };
        break;
    case 'affectTuteur':
        stage = {
          etat: req.body.etat,
          tuteur: req.body.tuteur,
        };
        break;
    case 'affectRapporteur':
          stage = {
            etat: req.body.etat,
            rapporteur: req.body.rapporteur,
          };
          break;
    default:
      stage = {
        etat: req.body.etat,
      };
      break;
  }
  console.log(stage);
  Stage.updateOne({_id: req.params.id}, stage)
      .then(() => {
          res.status(201).json({
              message: 'Changement de l\'état du stage : '+ req.params.id + ' -> le nouvel état est [' + req.body.etat +']'
          });
      })
      .catch((error) => {
          res.status(400).json({error: error});
      });
};

/**
 * @api {get} /stage Get Stage by keyword
 * @apiName getStageByKeyword
 * @apiGroup Stage
 */
exports.getStageByKeyword = ((req, res, next) => {

  let keyword = req.params.keyword;

  Stage.find(
    {
      /*
      "titre": {$regex: `^.*${keyword}.*$`, $options: "i"},
      "entreprise.nomComplet": {$regex: `^.*${keyword}.*$`, $options: "i"},
      "parcours.nomComplet": {$regex: `^.*${keyword}.*$`, $options: "i"},
      "etat": {$regex: `^.*${keyword}.*$`, $options: "i"}
    */
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
    console.log(req.body.data);
    let stage = new Stage();
    if(req.files) {
        const stageobject = JSON.parse(req.body.data);
        delete stageobject._id;
         stage = new Stage({
            ...stageobject,
            fichier: `${req.protocol}://${req.get('host')}/docs/${req.files[0].filename}`
        });
    } else {
       stage = new Stage({
            etat: req.body.etat,

            titre: req.body.titre,
            description: req.body.description,
            duree: req.body.duree,

            dateDebut: req.body.dateDebut,
            datePropose: req.body.datePropose,
            dateValide: req.body.dateValide,

            rapport: req.body.rapport,
            resume: req.body.resume,

            niveauRequis: req.body.niveauRequis,
            conditions: req.body.conditions,
            objectifs: req.body.objectifs,
            competences: req.body.competences,

            salaire: req.body.salaire,
            avantages: req.body.avantages,

            commentaires: [], // lors de la création du stage, il n'y a aucun commentaire

            ficheSuivi: req.body.ficheSuivi,
            noteStage: req.body.noteStage,
            visiteStage: req.body.visiteStage,

            parcours: req.body.parcours,
            entreprise: req.body.entreprise,

            ajouteur: req.body.ajouteur,
            repEntreprise: req.body.repEntreprise,
            tuteur: req.body.tuteur,
            rapporteur: req.body.rapporteur,
            etudiant: req.body.etudiant,
        });
    }
    stage.save()
            .then(() => {
                res.status(201).json({
                    message: 'Post saved successfully!'
                });
            })
            .catch((error) => {
                res.status(400).json({error: error});
            });
    }
    ;

    /**
     * @api {put} /stage/:id Edit a Stage
     * @apiName EditStage
     * @apiGroup Stage
     *
     * @apiParam {Number} id Stage's unique ID.
     */
    exports.editStage = (req, res, next) => {
        console.log(req.body);
        console.log(req.files);

        const stage  =
        /*= req.files ?
            {
                ...JSON.parse(req.body.data),
                fichier: `${req.protocol}://${req.get('host')}/docs/${req.files[0].filename}`,
                _id: req.params.id
            } : */{
                ...req.body,
                _id: req.params.id
            }
        console.log(stage);


        Stage.updateOne({_id: req.params.id}, stage)
            .then(() => {
                res.status(201).json({
                    message: 'Stage updated successfully!'
                });
            })
            .catch((error) => {
                res.status(400).json({error: error});
                console.log({error: error});
            });
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

