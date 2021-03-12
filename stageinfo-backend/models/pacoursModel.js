const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parcoursSchema = Schema({

        niveau: String,
        acronyme: String,
        intitule: String,
        description: String,
        existe: Boolean,
        idResp: Schema.Types.ObjectId,  // id responsable parcours
    },
    {
        collection: 'Parcours'
    });

module.exports = mongoose.model('Parcours', parcoursSchema);
