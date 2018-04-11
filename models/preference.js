var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var User = require('./user');
var Team = require('./team');

var schema = new Schema({
    teamName: {type: Schema.Types.ObjectId, ref: 'Team'},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    preferred: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Preferences', schema);