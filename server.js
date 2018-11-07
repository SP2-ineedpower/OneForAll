const mysql = require('mysql');
const express = require('express');
const cors = require('cors')
const app = express();


const SELECTUSERS = 'SELECT * from user where userId = 1';
const SELECTUSERPROJECTS = 'SELECT * FROM project where creatorId = 1';
const SELECTLINKS = 'SELECT * FROM userlink where userId = 1';
const SELECTCOMPETENCES = 'SELECT * FROM competence where userId = 1';
const SELECTDISPLAYPROJECT = 'SELECT * FROM project where projectId = ';
const SELECTPROJECTCOMMENT = 'SELECT * FROM projectcomment where projectId = 1'

const connection = mysql.createConnection({
    host     : 'dt5.ehb.be',
    user     : '1819SP2_oneforall',
    password : 'NjGkqLQ',
    database : '1819SP2_oneforall'
});

connection.connect(function(error) {
    if (error) {
        console.log('Error');
    }else {
        console.log('Connected');
    }
});

app.use(cors());

app.get('/users', (req,res) => {
    connection.query(SELECTUSERS,(err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
})

app.get('/userLinks', (req,res) => {
    connection.query(SELECTLINKS,(err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
})

app.get('/userCompetences', (req,res) => {
    connection.query(SELECTCOMPETENCES,(err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
})

app.get('/userProjects', (req,res) => {
    connection.query(SELECTUSERPROJECTS,(err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
})

app.get('/displayProject', (req,res) => {
    const projId  = req.param("projId");

    console.log(projId);
    connection.query(SELECTDISPLAYPROJECT + 1  ,(err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
})

app.get('/projectcomment', (req,res) => {
    connection.query(SELECTPROJECTCOMMENT,(err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
})



const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
