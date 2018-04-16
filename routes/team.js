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
            //users[]
            
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

router.get('/generate/:id', function (req, res, next) {
    
    var groupID = req.params.id;  

    Team.find({"teamId": id.toString()}, function(err, group){

         if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

        if (!team) {
            return res.status(401).json({
                title: 'Wrong Information',
                error: {message: 'Group ID does not exist'}
            });
        }

        return res.status(401).json({
                title: 'Wrong Information',
                error: {message: 'Group ID does not exist'}
            });
        //console.log(group.groupNumber)



        /*
            USE GROUP ID TO ACCESS MEMBERS IN THE POOL. USE TWO POPULATE THEM INTO A LIST OF USERS.
            USE A FOR LOOP FOR THAT.
        */

        /*
            USE TWO FOR LOOPS. FIRST TO ITERATE THROUGH ALL MEMBERS OF LIST, SECOND TO ITERATE THROUGH ALL
            OTHER MEMBERS OF LIST AND REMOVE WHEN TEAM IS ASSIGNED. MIGHT REMOVE FIRST MEMBER BEFORE ANY
            LOOPING. 
        */

        /*
            INSIDE INNER LOOP. ACCESS PARAMTERS FROM USER TABLE TO CALCULATE THE CLOSEST 3 USERS BY COMPARING
            SKILLS WITH PREFERENCES. THEN FIND CLOSEST FOR VICE VERSA CASE. ADD TO TABLE AND REMOVE FROM LIST.
            MAINTAIN A COUNTER VARIABLE TO MOVE NEXT TABLE ONCE CURRENT TABLE IS FULL
        */

    });


});
module.exports = router;
