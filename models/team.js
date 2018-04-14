var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var User = require('./user');
var Preference = require('./preference');

var schema = new Schema({
    teamName: {type: String, required: true},
    teamSize: {type: Number, required: true},
    adminId: {type: String, required: true},
    adminEmail: {type: String, required: true}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Team', schema);