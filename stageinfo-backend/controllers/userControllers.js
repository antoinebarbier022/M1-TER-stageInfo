const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

exports.getAllUser = ((req, res, next) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(404).json({ error }));
});

exports.getOneUser = ((req, res, next) => {
    User.findOne({
      _id: req.params.id
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }))
  });

exports.signup = (req, res, next) =>{
    console.log(req.body)
    bcrypt.hash(req.body.password,10)
        .then(hash => {
            const user =new User({
                prenom: req.body.prenom,
                email: req.body.email,
                hash: hash,
                role: req.body.role,
                numeroEtudiant: req.body.numeroEtudiant,
                Fax: req.body.fax,
                telephone: req.body.telephone,
                fonction:req.body.fonction,
                nom: req.body.nom,
            });
            user.save()
                .then(() => res.status(201).json({message: 'Utilisateur crée!'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));

};

exports.login= (req, res, next) =>{
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(401).json({error : 'utilisateur non trouvé'})
            }
            bcrypt.compare(req.body.password, user.hash)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error : 'Mot de passe Incorrect !!'})

                    }
                    res.status(200).json({
                        userId: user._id,
                        role:user.role,
                        token: jwt.sign(
                            {userId: user._id,role:user.role},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.getemail = ((req, res, next) => {
    User.findOne({
        _id: req.params.id
    })
        .then(User => res.status(200).json(User.email),
        console.log(User))
        .catch(error => res.status(404).json({ error }))
});

exports.getRole = ((req, res, next) => {
    User.findOne({
        _id: req.params.id
    })
        .then(User => res.status(200).json(User.role),
        console.log(User))
        .catch(error => res.status(404).json({ error }))
});


/**
 * @api {put} /auth/:id Edit a User
 * @apiName EditUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 */
 exports.editUser = ((req, res, next) => {
    console.log(req.body);
    
    const user = new User({
       _id: req.params.id,
       nom: req.body.nom,
       email: req.body.email,
       prenom: req.body.prenom,
       telephone: req.body.telephone,
       fax: req.body.fax,
       role: req.body.role,
       numeroEtudiant: req.body.numeroEtudiant,
       promotion: req.body.promotion,
       parcours: req.body.parcours,
       fonction: req.body.fonction,
       entreprise: req.body.entreprise
    });

    User.updateOne({_id: req.params.id}, user)
       .then(() => {
           res.status(201).json({
               message: 'User updated successfully'
           });
       })
       .catch((error) => {
           res.status(400).json({
               error : error
           });
       });
});

/**
 * @api {delete} /user Delete a user
 * @apiName DeleteOneUser
 * 
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 */
 exports.deleteOneUser = (req, res, next) => {
    User.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'User deleted!'
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
