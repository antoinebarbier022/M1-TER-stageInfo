const mongoose = require('mongoose');

const stageSchema = mongoose.Schema({
    titre: String,
  });

module.exports = mongoose.model('Stage', stageSchema);