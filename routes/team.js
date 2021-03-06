var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Team = require('../models/team');
var User = require('../models/user');
var Group = require('../models/groups');

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
            adminEmail: req.body.adminEmail
            //users[]
            
        });

        team.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.save(function (err, result) {

                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }    

                res.status(201).json({
                    message: 'Saved team',
                    obj: result
                });
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

router.get('/add/:id/:email', function (req, res, next) {

    console.log(req.params.email.toString());
    User.findOne({email : req.params.email.toString()}, function (err, user) {

        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        if (!user) {
          return res.status(401).json({
                title: 'Wrong Information',
                error: {message: 'User does not exist'}
          });
        }

        var groupID = req.params.id;  


        console.log("Email should be below");
        console.log(user);
        //console.log(groupID)

        Team.findOne({"_id": groupID.toString()}, function(err, team){

            //console.log(team);
            team.members.push(user);
            team.save((function (err) {
                if (err) { 
                    console.log(err);
                }
            }));
            console.log(team.members);
            res.status(201).json({
                message: 'Added user',
                obj: team.members
            });
        });

    });

});

router.get('/generate/:id', function (req, res, next) {
    

    console.log(req.params.id);

    var groupID = req.params.id;  


    Team.find({"_id": groupID.toString()}, function(err, group){

         if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

        if (!group) {
            return res.status(401).json({
                title: 'Wrong Information',
                error: {message: 'Group ID does not exist'}
            });
        }

        /*
            copiedObjectWithID is a deep clone of the group/pool itself
        */
        var copiedObjectWithId = JSON.parse(JSON.stringify(group));

        


        var objectIdDel = function(copiedObjectWithId) {
            if (copiedObjectWithId != null && typeof(copiedObjectWithId) != 'string' &&
                typeof(copiedObjectWithId) != 'number' && typeof(copiedObjectWithId) != 'boolean' ) {
                //for array length is defined however for objects length is undefined
                    if (typeof(copiedObjectWithId.length) == 'undefined') { 
                        delete copiedObjectWithId._id;
                        for (var key in copiedObjectWithId) {
                            objectIdDel(copiedObjectWithId[key]); //recursive del calls on object elements
                        }
                    }
                    else {
                    for (var i = 0; i < copiedObjectWithId.length; i++) {
                        objectIdDel(copiedObjectWithId[i]);  //recursive del calls on array elements
                    }
                }
            }
        }

        objectIdDel(copiedObjectWithId)


        /*
            USE TWO FOR LOOPS. FIRST TO ITERATE THROUGH ALL MEMBERS OF LIST, SECOND TO ITERATE THROUGH ALL
            OTHER MEMBERS OF LIST AND REMOVE WHEN TEAM IS ASSIGNED. MIGHT REMOVE FIRST MEMBER BEFORE ANY
            LOOPING. 
        */


        var nextGroupID = 1;
        var curGroupID = 1;

        var curSize = 1;

        var current = copiedObjectWithId[0].members[0];
        var next = current;

        var groupedTeam = new Group({
            groupNumber: curGroupID,
            teamID: groupID,
            members: []

            //users[]
            
        });

       
       
        groupedTeam.members.push(current[0].email);
            
        copiedObjectWithId[0].members.splice(0, 1);

        while(true){
            
            if(copiedObjectWithId[0].members.length == 0)
                break;

            if(nextGroupID != curGroupID)
                curGroupID = nextGroupID;

            current = next;

            var smallestDist = Number.MAX_SAFE_INTEGER;
            var index = 0;

            for (var i = 0; i < copiedObjectWithId[0].members.length; i++){

                /*FIND CLOSEST OBJECT. SAVE THAT TO NEXT. REMOVE IT FROM TEAM/POOL DATABASE, ADD TO GROUP. 
                INCREASE COUNTER*/ 
                var check = copiedObjectWithId[0].members[i];

                var skills = current[0].skillset;
                var preference = check[0].preferenceSet;


                var skillArr = skills.split(",")
               

                var preferenceArr = preference.split(",")
                
                var temp = 0;
                for(var counter = 0; counter < preferenceArr.length; counter++){

                    temp = temp + Math.pow((skillArr[counter][skillArr[counter].length - 1] 
                                    - preferenceArr[counter][preferenceArr[counter].length - 1]), 2);
                }


                if(temp < smallestDist){
                    smallestDist = temp;
                    index = i;    

                    
                }

            }


                //ADD TO TEAM/ACTUAL TEAM HERE
                //next = whatever we remove from group/pool

            next = copiedObjectWithId[0].members[index];

            groupedTeam.members.push(next[0].email);

            copiedObjectWithId[0].members.splice(index, 1);

            curSize++;
            if(curSize == copiedObjectWithId[0].teamSize){
                curSize = 0;
                nextGroupID = curGroupID + 1;

                groupedTeam.save(function (err, result) {
                if (err) {
                    if (err) {
                    console.log("Error Occured")
                    }
                }
                  
                });

                var groupedTeam = new Group({
                groupNumber: curGroupID + 1,
                teamID: groupID,
                members: []
            
                });

            }   
        }

        return res.status(200).json({
                title: 'Right Information',
                error: {message: 'Groups successfully created'}
            });

    });


});

router.get('/getGroups/:id', function (req, res, next) {

    
    Group.find({'teamID': req.params.id})
        .populate()
        .exec(function (err, groups) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: groups
            });
        });

});

module.exports = router;
