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
                role: req.body.rolee,
                numeroEtudiant: req.body.numeroEtudiant,
                Fax: req.body.Fax,
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
                        email:user.email,
                        token: jwt.sign(
                            {userId: user._id,role:user.role,email:user.email},
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
