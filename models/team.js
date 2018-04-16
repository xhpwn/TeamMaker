var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var User = require('./user');
var Preference = require('./preference');

var schema = new Schema({
    teamName: {type: String, required: true},
    teamSize: {type: Number, required: true},
    skills: {type: String, required: true},
    adminId: {type: String, required: true},
    adminEmail: {type: String, required: true},
    teamId: {type: String, required: false}
});

schema.plugin(mongooseUniqueValidator);

schema.post('remove', function (team) {
    User.findById(team.teamId, function (err, user) {
        user.teams.pull(team);
        user.save();
    });
});

module.exports = mongoose.model('Team', schema);