const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());

//code from https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



const connection = mysql.createConnection({
    host     : 'dt5.ehb.be',
    user     : '1819SP2_oneforall',
    password : 'NjGkqLQ',
    database : '1819SP2_oneforall'
});

connection.connect((error) => {
    if (error) {
        console.log('Error');
    }else {
        console.log('MySQL Database Connected');
    }
});


//USERS

    //Select all users from the database
    app.get('/users', (req, res)=>{
    let sqlCommand = 'SELECT * FROM user';
    let query = connection.query(sqlCommand, (err, results)=>{
        if(err) console.log("Error");
        console.log(results);
        res.send(results);
    });
    });

    //Select a specific user from the database, based on the ID
    app.get('/users/:id', (req, res)=>{
        let query = connection.query("SELECT * FROM user WHERE userId = ?", [req.params.id], (err, result)=>{
            if(err) console.log("Error");
            console.log(result);
            res.send(result);
        });
    });

    //Delete a specific user from the database, based on the ID
    app.delete('/users/:id', (req, res)=>{
        let query = connection.query("DELETE FROM user WHERE userId = ?", [req.params.id], (err, result)=>{
            if(err) console.log("Error");
            res.send(`User with ID ${req.params.id} is deleted`);
        });
    });

//UPDATE USERS
    app.put('/users/:id', (req, res)=>{

        var data = {
            bio:req.body.bio,
            subject:req.body.subject,
            age:req.body.age
        };

        let query = connection.query("UPDATE user SET ? WHERE userId = ?", [data, req.params.id], (err, result)=>{
            if(err) console.log("Error");
            res.send(`User with ID ${req.params.id} is updated`);
        });
    });

    //Update the user age
    app.post('/user/age', (req, res)=>{
        //console.log("dit is een test" + req);
        var data = req.body.age;
        //console.log(data);
        let query = connection.query("UPDATE user SET age= ? WHERE userId = ?", [data, req.body.id], (err, result)=>{
            if(err) console.log("Error");
            res.send(`User with ID ${req.params.id} is updated`);
        });
    });

    app.post('/user/studies', (req, res)=>{
        //console.log("dit is een test" + req);
        var data = req.body.studies;
        //console.log(data);
        let query = connection.query("UPDATE user SET subject= ? WHERE userId = ?", [data, req.body.id], (err, result)=>{
            if(err) console.log("Error");
            res.send(`User with ID ${req.params.id} is updated`);
        });
    });

    app.post('/user/bio', (req, res)=>{
        var data = req.body.bio;
        let query = connection.query("UPDATE user SET bio= ? WHERE userId = ?", [data, req.body.id], (err, result)=>{
            if(err) console.log("Error");
            res.send(`User with ID ${req.params.id} is updated`);
        });
    });


//PROJECTS


    //Select all projects from the database
    app.get('/displayProjects', (req, res)=>{
        let sqlCommand = "SELECT DISTINCT p.name as 'projectname', u.name, p.projectId FROM project p,projecttag t,user u WHERE p.projectId = t.projectId and p.creatorId = u.userId";
        let query = connection.query(sqlCommand, (err, results)=>{
            if(err) console.log("Error");
            console.log(results);
            res.send(results);
        });
    });

    //Select a project from the database, based on its ID
    app.get('/displayProject/:id', (req, res)=>{
        let query = connection.query("SELECT * FROM project WHERE projectId = ?", [req.params.id], (err, results)=>{
            if(err) console.log("Error");
            console.log(results);
            res.send(results);
        });
    });

    //Select a group of projects by one of their tags
    app.get('/displayProjects/tag/:tag', (req, res)=>{
        let query = connection.query("SELECT p.name as 'projectname', u.name, p.projectId FROM project p,projecttag t,user u WHERE p.projectId = t.projectId and p.creatorId = u.userId and LOWER(tag) = ?", [req.params.tag], (err, results)=>{
            if(err) console.log("Error");
            console.log(results);
            res.send(results);
        });
    });

    //Select a group of projects by the owner or participant id
    app.get('/displayProjects/user/:user', (req, res)=>{
        let query = connection.query(`SELECT DISTINCT p.projectId, p.name as 'projectname' from project p , user u, participant part WHERE p.creatorId = u.userId AND u.userId = ${req.params.user} OR part.projectId = p.projectId AND u.userId = part.userId AND part.userId = ${req.params.user}`, [req.params.user], (err, results)=>{
            if(err) console.log("Error");
            console.log(results);
            res.send(results);
        });
    });

    //Display the name of the owner of a project
    app.get('/projectowner/:id', (req, res)=>{
        let query = connection.query("SELECT u.name FROM user u, project p WHERE u.userId = p.creatorId and p.projectId = ?", [req.params.id], (err, results)=>{
            if(err) console.log("Error");
            console.log(results);
            res.send(results);
        });
    });

    //Select participants of a project based on the id of the project
    app.get('/project/participants/:id', (req, res)=>{
        let query = connection.query("SELECT pa.participantId, u.userId, u.name FROM participant pa, project p, user u WHERE p.projectId = ? AND p.projectId = pa.projectId AND u.userId = pa.userId", [req.params.id], (err, results)=>{
            if(err) console.log("Error");
            console.log(results);
            res.send(results);
        });
    });

    //Select the mail of owner of a project
    app.get('/project/owner/:id', (req, res)=>{
        let query = connection.query("SELECT u.userId, u.name, u.email FROM project p, user u WHERE p.projectId = ? AND p.creatorId = u.userId", [req.params.id], (err, results)=>{
            if(err) console.log("Error");
            console.log(results);
            res.send(results);
        });
    });

//UPDATE PROJECTS

    //Update the project
    app.put('/projects/:id', (req, res)=>{

        var data = {
            name:req.body.name,
            description:req.body.description,
            groupsize:req.body.groupsize
        };

        let query = connection.query("UPDATE project SET ? WHERE projectId = ?", [data, req.params.id], (err, result)=>{
            if(err) console.log("Error");
            res.send(`Project with ID ${req.params.id} is updated`);
        });
    });

    //Update the project name
    app.post('/project/name', (req, res)=>{
        var data = req.body.name;
        let query = connection.query("UPDATE project SET name= ? WHERE projectId = ?", [data, req.body.id], (err, result)=>{
            if(err) console.log("Error");
            res.send(`Project with ID ${req.params.id} is updated`);
        });
    });

    //Update the project description
    app.post('/project/description', (req, res)=>{
        var data = req.body.description;
        let query = connection.query("UPDATE project SET description= ? WHERE projectId = ?", [data, req.body.id], (err, result)=>{
            if(err) console.log("Error");
            res.send(`Project with ID ${req.params.id} is updated`);
        });
    });

    //Update the project groupsize
    app.post('/project/groupsize', (req, res)=>{
        var data = req.body.groupsize;
        let query = connection.query("UPDATE project SET groupsize= ? WHERE projectId = ?", [data, req.body.id], (err, result)=>{
            if(err) console.log("Error");
            res.send(`Project with ID ${req.params.id} is updated`);
        });
    });

//LINKS

    //Select all UserLinks from the database, based on the userID
    app.get('/userLinks/:id', (req, res)=>{
        let query = connection.query("SELECT * FROM userlink WHERE userId = ?", [req.params.id], (err, result)=>{
            if(err) console.log("Error");
            console.log(result);
            res.send(result);
        });
    });

    //Select all projectlinks from the database, based on the projectId
    app.get('/projectlinks/:id', (req, res)=>{
        let query = connection.query("SELECT * FROM projectlink WHERE projectId = ?", [req.params.id], (err, result)=>{
            if(err) console.log("Error");
            console.log(result);
            res.send(result);
        });
    });

    //Delete one of the links of a user
    app.get('/userLinks/delete/:id', (req, res)=>{
        let query = connection.query("delete FROM userlink WHERE userLinkId = ?", [req.params.id], (err, result)=>{
            if(err) console.log("Error");
            console.log(result);
            res.send(result);
        });
    });

    //Add link in the user profile
    app.post('/userLinks/add/', (req, res)=>{

        let query = connection.query("insert into userlink values(null,?,?)", [req.body.id,req.body.url], (err, result)=>{
            if(err) console.log("Error");
            console.log(result);
            res.send("link added");
        });
    });

//TAGS

    //Select all tags of a user based on his id
    app.get('/userCompetences/:id', (req, res)=>{
        let query = connection.query("SELECT * FROM competence WHERE userId = ?", [req.params.id], (err, result)=>{
            if(err) console.log("Error");
            console.log(result);
            res.send(result);
        });
    });

    //Add a tag to the competences of a user
    app.get('/userCompetences/add/:id/:tag', (req, res)=>{
        let query = connection.query("insert into competence values(null,?,?)", [req.params.id,req.params.tag], (err, result)=>{
            if(err) console.log("Error");
            console.log(result);
            res.send(result);
        });
    });

    //delete a competence of a user
    app.get('/userCompetences/delete/:id', (req, res)=>{
        let query = connection.query("DELETE from competence where competenceId = ?", [req.params.id], (err, result)=>{
            if(err) console.log("Error");
            console.log(result);
            res.send(result);
        });
    });

    //Select tags of a project
    app.get('/projecttags/:id', (req, res)=>{
        let query = connection.query("SELECT * FROM projecttag WHERE projectId = ?", [req.params.id], (err, result)=>{
            if(err) console.log("Error");
            console.log(result);
            res.send(result);
        });
    });

//COMMENTS

    //Select all comments of a project based on his id
    app.get('/comments/:id', (req, res)=>{
        let query = connection.query("SELECT * FROM projectcomment,user WHERE user.userId = projectcomment.userId AND projectId = ?", [req.params.id], (err, result)=>{
            if(err) console.log("Error");
            console.log(result);
            res.send(result);
        });
    });

    app.post('/comments/add/', (req, res)=>{

        let query = connection.query("insert into projectcomment values(null,?,CURRENT_TIMESTAMP,?,?)", [req.body.comment,req.body.projId,req.body.userId], (err, result)=>{
            if(err) console.log("Error");
            console.log("test: " + req.body.userId);
            res.send("comment added");
        });
    });



//PROBLEMS

    //Select all problems from a project with the project id
    app.get('/project/projectproblem/:id', (req, res)=>{
        let query = connection.query("SELECT proj.projectId, prob.problemId, prob.problem FROM problem prob, project proj WHERE proj.projectId = ? AND prob.projectId = proj.projectId", [req.params.id], (err, result)=>{
            if(err) console.log("Error");
            console.log(result);
            res.send(result);
        });
    });

//LIKES

    //Get all likes of a project
    app.get('/projectlikes/:id', (req, res)=>{
        let query = connection.query("SELECT * from projectlike where projectId = ?", [req.params.id], (err, result)=>{
            if(err) console.log("Error");
            console.log(result);
            res.send(result);
        });
    });

    //add like on project into database
    app.get('/projectlike/add/:proj/:user', (req, res)=>{
        let query = connection.query("Insert into projectlike values(null,?,?,CURRENT_TIMESTAMP)", [req.params.proj,req.params.user], (err, result)=>{
            if(err) console.log("Error");
            console.log(result);
            res.send(result);
        });
    });

    //Delete like on project from database
    app.get('/projectlike/delete/:proj/:user', (req, res)=>{
        let query = connection.query("delete from projectlike where projectId= ? AND userId = ?", [req.params.proj,req.params.user], (err, result)=>{
            if(err) console.log("Error");
            console.log(result);
            res.send(result);
        });
    });

app.listen('5000', () => console.log("Server started on port 5000"));
