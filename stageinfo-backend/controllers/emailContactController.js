const Email = require('../models/emailContactModel');

exports.getAllEmail = ((req, res, next) => {
    Email.findOne({_id: '60b40384dfad1220980d17a9'})
        .then(Email => res.status(200).json(Email))
        .catch(error => res.status(404).json({ error }));
});

exports.createEmail = ((req, res, next) => {
    console.log(req.body);

    // Récupération des inputs utilisateur
    const email = new Email({

        email: req.body.email
    });

    // Envoi dans la bdd
    email.save()
        .then(() => res.status(201).json({
            message: 'Lemail a bien été envoyé'
        }))
        .catch(error => res.status(404).json({error: error}));
});

exports.editEmail = ((req, res, next) => {
    console.log(req.body);

    const email = new Email({
        _id: '60b40384dfad1220980d17a9',
        email: req.body.email.email
    });

    Email.updateOne({_id: '60b40384dfad1220980d17a9'}, email)
        .then(() => {
            res.status(201).json({
                message: 'email updated successfully'
            });
        })
        .catch((error) => {
            res.status(404).json({
                error : error
            });
        });
});