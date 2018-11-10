const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors());
const connection = mysql.createConnection({
    host     : 'dt5.ehb.be',
    user     : '1819SP2_oneforall',
    password : 'NjGkqLQ',
    database : '1819SP2_oneforall'
});

let newUser = {
    'bio' : 'test',
    'subject' : 'testjes',
    'age' : 23
}

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

    //Updated the user
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
    app.get('/displayProjects/:id', (req, res)=>{
        let query = connection.query("SELECT * FROM project WHERE projectId = ?", [req.params.id], (err, results)=>{
            if(err) console.log("Error");
            console.log(results);
            res.send(results);
        });
    });

    //Select a group of projects by one of their tags
    app.get('/displayProjects/tag/:tag', (req, res)=>{
        let query = connection.query("SELECT p.name as 'projectname', u.name, p.projectId FROM project p,projecttag t,user u WHERE p.projectId = t.projectId and p.creatorId = u.userId and tag = ?", [req.params.tag], (err, results)=>{
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
        let query = connection.query("SELECT u.name from user u, project p where u.userId = p.creatorId and p.projectId = ?", [req.params.id], (err, results)=>{
            if(err) console.log("Error");
            console.log(results);
            res.send(results);
        });
    });
    


//LINKS

    //Select a specific UserLink from the database, based on the userID
    app.get('/userLinks/:id', (req, res)=>{
        let query = connection.query("SELECT * FROM userlink WHERE userId = ?", [req.params.id], (err, result)=>{
            if(err) console.log("Error");
            console.log(result);
            res.send(result);
        });
    });


//TAGS

app.get('/userCompetences/:id', (req, res)=>{
    let query = connection.query("SELECT * FROM competence WHERE userId = ?", [req.params.id], (err, result)=>{
        if(err) console.log("Error");
        console.log(result);
        res.send(result);
    });
});

app.get('/projecttags/:id', (req, res)=>{
    let query = connection.query("SELECT * FROM projecttag WHERE projectId = ?", [req.params.id], (err, result)=>{
        if(err) console.log("Error");
        console.log(result);
        res.send(result);
    });
});



app.listen('5000', () => console.log("Server started on port 5000"));
