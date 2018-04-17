var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');


var User = require('./user');

var schema = new Schema({
    groupNumber: {type: Number, required: true},
    teamID: {type: String, required: true},
    members: [{type: String, required: false}]
},{
    usePushEach: true
  }
);

schema.plugin(mongooseUniqueValidator);
    
module.exports = mongoose.model('Group', schema);