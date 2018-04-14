var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var User = require('./user');
var Preference = require('./preference');

var schema = new Schema({
    teamName: {type: String, required: true},
    admin: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Team', schema);