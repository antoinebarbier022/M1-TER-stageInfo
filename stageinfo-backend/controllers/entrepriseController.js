const Entreprise = require('../models/entrepriseModel');

/**-------------------CREATION-ENTREPRISE-----------------------**/

exports.createEntreprise = (req, res, next) => {
  const entreprise = new Entreprise ({
      ...req.body
    });
  entreprise.save()
      .then(() => {
          res.status(201).json({message: 'Entreprise created!'})
      })
      .catch((error) => { res.status(400).json({ error: error});});
};

/**----------------------AFFICHAGE--ENTREPRISE-------------------**/

exports.getAllEntreprise = (req, res, next) => {
    Entreprise.find()
        .then(entreprise => res.status(200).json(entreprise))
        .catch(error =>res.status(404).json({error}));
}
exports.getOneEntreprise = (req,res, next) => {
    Entreprise.findOne({_id: req.params.id})
        .then(entreprise => res.status(200).json(entreprise))
        .catch(error => res.status(404).json(error));
};

/**--------------------------MODIFICATION--ENTREPRISE-----------------**/

exports.editEntreprise = (req, res, next) => {
    const entreprise = new Entreprise ({
        _id: req.params.id,
        ...req.body
    });
    Entreprise.updateOne({_id: req.params.id}, entreprise)
        .then(() => {
        res.status(201).json({
            message: 'Entreprise updated successfully!'
        });
    })
        .catch((error) => { res.status(400).json({ error: error});});
};

/**-----------------SUPPRESSION---ENTREPRISE-------------------**/

exports.deleteOneEntreprise = (req, res, next) => {
  Entreprise.deleteOne({_id: req.params.id})
      .then(() => {
      res.status(200).json({
          message: 'Entreprise DELETED!'
      });
  })
      .catch((error) => { res.status(400).json({ error: error});});
};
exports.deleteAllEntreprise = (req,res,next) => {
    Entreprise.deleteMany({})
        .then(() => {
        res.status(200).json({
            message: 'All Entreprises DELETED!'
        });
    })
        .catch((error) => { res.status(400).json({ error: error});});
};
