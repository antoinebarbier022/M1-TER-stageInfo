const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const emailContact = Schema({
    email : {type: String, required: true, unique: true},
},
    {
        collection: 'emailContact'
    });

emailContact.plugin(uniqueValidator);

module.exports = mongoose.model('emailContact', emailContact);
