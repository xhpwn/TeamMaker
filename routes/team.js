var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Team = require('../models/team');
var User = require('../models/user');

router.post('/newteam', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var team = new Team({
            teamName: req.body.teamName,
            teamSize: req.body.teamSize,
            skills: req.body.skills,
            adminId: req.body.adminId,
            adminEmail: req.body.adminEmail,
            
        });

        team.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.save();
            res.status(201).json({
                message: 'Saved team',
                obj: result
            });
        });
    });
});

router.get('/', function (req, res, next) {
    Team.find()
        .populate('user', 'firstName')
        .exec(function (err, teams) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: teams
            });
        });
});

module.exports = router;
