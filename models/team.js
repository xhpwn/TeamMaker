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
    members: [{type: Array, required: false}],
    teamId: {type: String, required: false}
}, {
    usePushEach: true
  }
);

schema.plugin(mongooseUniqueValidator);

schema.post('add', function (user) {
    Team.findOne({"teamName": "team.teamName"}, function (err, group) {
        group.members.push(user);
        team.save();
    });
});

module.exports = mongoose.model('Team', schema);