const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("express-jwt");
app.use(cors());
require("dotenv").config();
require("dotenv/config");
const bcrypt = require("bcryptjs");
let salt = bcrypt.genSaltSync(10);

const path = require("path");
app.use(express.static(path.join(__dirname, "ineedpower/build")));
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "ineedpower/build", "index.html"));
});
app.listen(9000);

//code from https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const connection = mysql.createConnection({
  host: process.env.REACT_APP_HOST,
  user: process.env.REACT_APP_USER,
  password: process.env.REACT_APP_PASSWORD,
  database: process.env.REACT_APP_DATABASE
});

connection.connect(error => {
  if (error) {
    console.log("Error");
  } else {
    console.log("MySQL Database Connected");
  }
});

//USERS

//Tokens
// code from https://medium.com/@maison.moa/using-jwt-json-web-tokens-to-authorize-users-and-protect-api-routes-3e04a1453c3e
// https://github.com/dcalsky/jwt-express-react/blob/master/server/routes/user.js
app.post("/authenticate/token/", (req, res) => {
  const token = jsonwebtoken.sign(
    {
      username: req.body.username,
      email: req.body.email,
      userId: req.body.userId // default is normal
    },
    process.env.TOKEN_PASS,
    {
      // get secret from config
      expiresIn: "1d" // expires in 1 day
    }
  );
  res.json({
    username: req.body.username,
    token: token,
    email: req.body.email
  });
});

/*app.post("/authenticate/getUser",(req, res) => {
  //console.log("hello");
  const token = req.body.token;
  //res.send({test:"test"});
  jsonwebtoken.verify(token,process.env.TOKEN_PASS), (err, authorizedData) => {
    if(err){
        //If error send Forbidden (403)
        console.log('ERROR: Could not connect to the protected route');
        res.sendStatus(403);
    } else {
        //If token is successfully verified, we can send the autorized data 
        res.json({
            authorizedData
        });
        console.log('SUCCESS');
    }
  }
});*/

//insert a new user
app.post("/user/create", (req, res) => {
  bcrypt.hash(req.body.password, salt, function(err, hash) {
    let query = connection.query(
      "insert into user values(null,?,?,?,?,?,?,?)",
      [
        req.body.name,
        req.body.email,
        hash,
        req.body.experience,
        req.body.bio,
        req.body.subject,
        req.body.type
      ],
      (err, result) => {
        if (err) console.log("Error");
      }
    );
  });
});

//delete user info everywhere 
app.post("/user/deleteCascade", (req, res) => {
  bcrypt.hash(req.body.password, salt, function (err, hash) {
    let query = connection.query("DELETE FROM user WHERE userId = ? ", [req.body.userId],
      (err, result) => {
        if (err) console.log("Error");
      }
    );
  });
});


//Select all users from the database
app.get("/users", (req, res) => {
  let sqlCommand = "SELECT * FROM user";
  let query = connection.query(sqlCommand, (err, results) => {
    if (err) console.log("Error");
    //console.log(results);
    res.send(results);
  });
});

//select a specific user with its email
app.get("/login/user/:email", (req, res) => {
  let query = connection.query(
    "SELECT * FROM user WHERE email = ?",
    [req.params.email],
    (err, result) => {
      if (err) console.log("Error");
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send(err);
      }
    }
  );
});

//Autheticate a user with his email
app.post("/authenticate/", (req, res) => {
  bcrypt.compare(req.body.password, req.body.userPassword, function(
    err,
    result
  ) {
    res.send({ result: result });
  });
});

//Select a specific user from the database, based on the ID
app.get("/users/:id", (req, res) => {
  let query = connection.query(
    "SELECT * FROM user WHERE userId = ?",
    [req.params.id],
    (err, result) => {
      if (err) console.log("Error");
      // console.log(result);
      res.send(result);
    }
  );
});

//Delete a specific user from the database, based on the ID
app.delete("/users/:id", (req, res) => {
  let query = connection.query(
    "DELETE FROM user WHERE userId = ?",
    [req.params.id],
    (err, result) => {
      if (err) console.log("Error");
      res.send(`User with ID ${req.params.id} is deleted`);
    }
  );
});

//Select all users having a specific competence
app.get("/users/competence/:competence", (req, res) => {
  let query = connection.query(
    "SELECT u.name,u.userId FROM user u, competence c WHERE u.userId = c.userId and lower(competence) = ?",
    [req.params.competence],
    (err, result) => {
      if (err) console.log("Error");
      // console.log(result);
      res.send(result);
    }
  );
});

//Select users by a part of their name
app.get("/users/search/:search", (req, res) => {
  const like = `%${req.params.search}%`;
  let query = connection.query(
    "SELECT DISTINCT u.name,u.userId FROM user u, competence c WHERE u.userId = c.userId and lower(competence) LIKE ? OR  u.userId = c.userId and lower(u.name) LIKE ?",
    [like, like],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send(result);
    }
  );
});

//UPDATE USERS
app.put("/users/:id", (req, res) => {
  var data = {
    bio: req.body.bio,
    subject: req.body.subject,
    age: req.body.age
  };

  let query = connection.query(
    "UPDATE user SET ? WHERE userId = ?",
    [data, req.params.id],
    (err, result) => {
      if (err) console.log("Error");
      res.send(`User with ID ${req.params.id} is updated`);
    }
  );
});

//Update the user age
app.post("/user/age", (req, res) => {
  //console.log("dit is een test" + req);
  var data = req.body.age;
  //console.log(data);
  let query = connection.query(
    "UPDATE user SET age= ? WHERE userId = ?",
    [data, req.body.id],
    (err, result) => {
      if (err) console.log("Error");
      res.send(`User with ID ${req.params.id} is updated`);
    }
  );
});

app.post("/user/studies", (req, res) => {
  //console.log("dit is een test" + req);
  var data = req.body.studies;
  //console.log(data);
  let query = connection.query(
    "UPDATE user SET subject= ? WHERE userId = ?",
    [data, req.body.id],
    (err, result) => {
      if (err) console.log("Error");
      res.send(`User with ID ${req.params.id} is updated`);
    }
  );
});

app.post("/user/bio", (req, res) => {
  var data = req.body.bio;
  let query = connection.query(
    "UPDATE user SET bio= ? WHERE userId = ?",
    [data, req.body.id],
    (err, result) => {
      if (err) console.log("Error");
      res.send(`User with ID ${req.params.id} is updated`);
    }
  );
});

//PROJECTS

//insert a new project
app.post("/project/add", (req, res) => {
  let query = connection.query(
    "insert into project values(null,?,?,?,0,CURRENT_TIMESTAMP,?)",
    [
      req.body.name,
      req.body.creatorId,
      req.body.description,
      req.body.groupsize
    ],
    (err, result) => {
      if (err) console.log("Error");
      res.send(`Project with ID ${req.params.id} is updated`);
    }
  );
});

//Select all projects from the database
app.get("/displayProjects", (req, res) => {
  let sqlCommand =
    "SELECT DISTINCT p.name as 'projectname', u.name, p.projectId FROM project p,projecttag t,user u WHERE p.projectId = t.projectId and p.creatorId = u.userId";
  let query = connection.query(sqlCommand, (err, results) => {
    if (err) console.log("Error");
    //  console.log(results);
    res.send(results);
  });
});

//Select a project from the database, based on its ID
app.get("/displayProject/:id", (req, res) => {
  let query = connection.query(
    "SELECT * FROM project WHERE projectId = ?",
    [req.params.id],
    (err, results) => {
      if (err) console.log("Error");
      //  console.log(results);
      res.send(results);
    }
  );
});

//Select a group of projects by one of their tags
app.get("/displayProjects/tag/:tag", (req, res) => {
  let query = connection.query(
    "SELECT p.name as 'projectname', u.name, p.projectId FROM project p,projecttag t,user u WHERE p.projectId = t.projectId and p.creatorId = u.userId and LOWER(tag) = ?",
    [req.params.tag],
    (err, results) => {
      if (err) console.log("Error");
      //  console.log(results);
      res.send(results);
    }
  );
});

//Select a project by his name or owner or name or tags
app.get("/displayProjects/search/:search", (req, res) => {
  const like = `%${req.params.search}%`;
  console.log(like);
  let query = connection.query(
    "SELECT DISTINCT p.name as 'projectname', u.name, p.projectId FROM project p,projecttag t,user u WHERE p.projectId = t.projectId and p.creatorId = u.userId and p.name LIKE ? OR  p.projectId = t.projectId and p.creatorId = u.userId and u.name LIKE ? OR  p.projectId = t.projectId and p.creatorId = u.userId and LOWER(t.tag) = ?",
    [like, like, req.params.search],
    (err, results) => {
      if (err) console.log("Error");
      //  console.log(results);
      res.send(results);
    }
  );
});

//Select the 8 most popular projects
app.get("/displayProjects/liked/:id", (req, res) => {
  let query = connection.query(
    "SELECT p.name as 'projectname', u.name, p.projectId FROM project p, projectlike pl,user u where p.projectId=pl.projectId and p.creatorId = u.userId and pl.userId = ?",
    [req.params.id],
    (err, results) => {
      if (err) console.log("Error");
      //  console.log(results);
      res.send(results);
    }
  );
});

//Select a group of projects by the owner or participant id
app.get("/displayProjects/user/:user", (req, res) => {
  let query = connection.query(
    `SELECT DISTINCT p.projectId, p.name as 'projectname',p.creatorId from project p , user u, participant part WHERE p.creatorId = u.userId AND u.userId = ? OR part.projectId = p.projectId AND u.userId = part.userId AND part.userId = ?`,
    [req.params.user, req.params.user],
    (err, results) => {
      if (err) console.log("Error");
      console.log(results);
      res.send(results);
    }
  );
});

//Display the name of the owner of a project
app.get("/projectowner/:id", (req, res) => {
  let query = connection.query(
    "SELECT u.name, u.userId FROM user u, project p WHERE u.userId = p.creatorId and p.projectId = ?",
    [req.params.id],
    (err, results) => {
      if (err) console.log("Error");
      //  console.log(results);
      res.send(results);
    }
  );
});

//Select the mail of owner of a project
app.get("/project/owner/:id", (req, res) => {
  let query = connection.query(
    "SELECT u.userId, u.name, u.email FROM project p, user u WHERE p.projectId = ? AND p.creatorId = u.userId",
    [req.params.id],
    (err, results) => {
      if (err) console.log("Error");
      //  console.log(results);
      res.send(results);
    }
  );
});

//UPDATE PROJECTS

//Update the project
app.put("/projects/:id", (req, res) => {
  var data = {
    name: req.body.name,
    description: req.body.description,
    groupsize: req.body.groupsize
  };

  let query = connection.query(
    "UPDATE project SET ? WHERE projectId = ?",
    [data, req.params.id],
    (err, result) => {
      if (err) console.log("Error");
      res.send(`Project with ID ${req.params.id} is updated`);
    }
  );
});

//Update the project name
app.post("/project/name", (req, res) => {
  var data = req.body.name;
  let query = connection.query(
    "UPDATE project SET name= ? WHERE projectId = ?",
    [data, req.body.id],
    (err, result) => {
      if (err) console.log("Error");
      res.send(`Project with ID ${req.params.id} is updated`);
    }
  );
});

//Update the project description
app.post("/project/description", (req, res) => {
  var data = req.body.description;
  let query = connection.query(
    "UPDATE project SET description= ? WHERE projectId = ?",
    [data, req.body.id],
    (err, result) => {
      if (err) console.log("Error");
      res.send(`Project with ID ${req.params.id} is updated`);
    }
  );
});

//Update the project groupsize
app.post("/project/groupsize", (req, res) => {
  var data = req.body.groupsize;
  let query = connection.query(
    "UPDATE project SET groupsize= ? WHERE projectId = ?",
    [data, req.body.id],
    (err, result) => {
      if (err) console.log("Error");
      res.send(`Project with ID ${req.params.id} is updated`);
    }
  );
});

//PROJECTLINKS

//Select all projectlinks from the database, based on the projectId
app.get("/projectlinks/:id", (req, res) => {
  let query = connection.query(
    "SELECT * FROM projectlink WHERE projectId = ?",
    [req.params.id],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send(result);
    }
  );
});

//Delete one of the links of a project
app.post("/projectlinks/delete/", (req, res) => {
  let query = connection.query(
    "delete FROM projectlink WHERE projectLinkId = ? AND projectId = ?",
    [req.body.projectLinkId, req.body.projectId],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send(result);
    }
  );
});

//Add link in projectlink
app.post("/projectlinks/add/", (req, res) => {
  let query = connection.query(
    "insert into projectlink values(null,?,?)",
    [req.body.projectId, req.body.url],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send("link added");
    }
  );
});

//LINKS

//Select all UserLinks from the database, based on the userID
app.get("/userLinks/:id", (req, res) => {
  let query = connection.query(
    "SELECT * FROM userlink WHERE userId = ?",
    [req.params.id],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send(result);
    }
  );
});

//Delete one of the links of a user
app.get("/userLinks/delete/:id", (req, res) => {
  let query = connection.query(
    "delete FROM userlink WHERE userLinkId = ?",
    [req.params.id],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send(result);
    }
  );
});

//Add link in the user profile
app.post("/userLinks/add/", (req, res) => {
  let query = connection.query(
    "insert into userlink values(null,?,?)",
    [req.body.id, req.body.url],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send("link added");
    }
  );
});

//TAGS

//Select all tags of a user based on his id
app.get("/userCompetences/:id", (req, res) => {
  let query = connection.query(
    "SELECT * FROM competence WHERE userId = ?",
    [req.params.id],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send(result);
    }
  );
});

//Add a tag to the competences of a user
app.get("/userCompetences/add/:id/:tag", (req, res) => {
  let query = connection.query(
    "insert into competence values(null,?,?)",
    [req.params.id, req.params.tag],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send(result);
    }
  );
});

//delete a competence of a user
app.get("/userCompetences/delete/:id", (req, res) => {
  let query = connection.query(
    "DELETE from competence where competenceId = ?",
    [req.params.id],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send(result);
    }
  );
});

//Select tags of a project
app.get("/projecttags/:id", (req, res) => {
  let query = connection.query(
    "SELECT * FROM projecttag WHERE projectId = ?",
    [req.params.id],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send(result);
    }
  );
});

app.post("/projecttags/tag/", (req, res) => {
  let query = connection.query(
    "insert into projecttag values(null,?,?)",
    [req.body.projectId,req.body.tag],
    (err, result) => {
      if (err) console.log("Error");
    //  console.log(result);
      res.send(result);
    }
  );
});



//COMMENTS

//Select all comments of a project based on his id
app.get("/comments/:id", (req, res) => {
  let query = connection.query(
    "SELECT * FROM projectcomment,user WHERE user.userId = projectcomment.userId AND projectId = ?",
    [req.params.id],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send(result);
    }
  );
});

app.get("/problemComments/:id", (req, res) => {
  let query = connection.query(
    "SELECT * FROM problemcomment,user WHERE user.userId = problemcomment.userId AND problemId = ?",
    [req.params.id],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send(result);
    }
  );
});

//insert new comment in database
app.post("/comments/add/", (req, res) => {
  let query = connection.query(
    "insert into projectcomment values(null,?,CURRENT_TIMESTAMP,?,?)",
    [req.body.comment, req.body.projId, req.body.userId],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log("test: " + req.body.userId);
      res.send("comment added");
    }
  );
});

//Insert new comment in problemcomment table
app.post("/problemComments/add/", (req, res) => {
  let query = connection.query(
    "insert into problemcomment values(null,?,?,?)",
    [req.body.problemId, req.body.comment, req.body.userId],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log("test: " + req.body.userId);
      res.send("comment added");
    }
  );
});

//delete comments in database with commentId
app.post("/comments/delete/:id", (req, res) => {
  let query = connection.query(
    "DELETE FROM projectcomment WHERE commentId = ?",
    [req.params.id],
    (err, result) => {
      if (err) console.log("Error");
      res.send(`Comment with ID ${req.params.id} is deleted`);
    }
  );
});

//PROBLEMS

app.get("/problem/:id", (req, res) => {
  let query = connection.query(
    "SELECT prob.problemId, prob.problem FROM problem prob WHERE problemId = ?",
    [req.params.id],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send(result);
    }
  );
});

//Select all participants of a project based on the id of the project
app.get("/project/participants/:id", (req, res) => {
  let query = connection.query(
    "SELECT pa.participantId, u.userId, u.name FROM participant pa, project p, user u WHERE p.projectId = ? AND p.projectId = pa.projectId AND u.userId = pa.userId",
    [req.params.id],
    (err, results) => {
      if (err) console.log("Error");
      //  console.log(results);
      res.send(results);
    }
  );
});

//Select all problems from a project with the project id
app.get("/project/projectproblem/:id", (req, res) => {
  let query = connection.query(
    "SELECT proj.projectId, prob.problemId, prob.problem FROM problem prob, project proj WHERE proj.projectId = ? AND prob.projectId = proj.projectId",
    [req.params.id],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send(result);
    }
  );
});

app.get("/project/projectproblem/tag/:tag", (req, res) => {
  let query = connection.query(
    "SELECT * from projecttag where tag = ?",
    [req.params.tag],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send(result);
    }
  );
});

//insert problem in database
app.post("/problems/add/", (req, res) => {
  let query = connection.query(
    "insert into problem values(null,?,?,0)",
    [req.body.projId, req.body.problem],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log("test: " + req.body.userId);
      res.send("problem added");
    }
  );
});

//delete problem in database
app.post("/problems/delete/", (req, res) => {
  let query = connection.query(
    "DELETE FROM problem WHERE problemId = ?",
    [req.body.problemId],
    (err, result) => {
      if (err) console.log("Error");
      res.send(`Problem with ID ${req.params.id} is deleted`);
    }
  );
});

app.get("/problems/search/:search", (req, res) => {
  const like = `%${req.params.search}%`;
  let query = connection.query(
    "SELECT * from problem where problem LIKE ?",
    [like],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send(result);
    }
  );
});

//PARTICIPANTS

//Select all participants of a project based on the id of the project
app.get("/project/participants/:id", (req, res) => {
  let query = connection.query(
    "SELECT pa.participantId, u.userId, u.name FROM participant pa, project p, user u WHERE p.projectId = ? AND p.projectId = pa.projectId AND u.userId = pa.userId",
    [req.params.id],
    (err, results) => {
      if (err) console.log("Error");
      //  console.log(results);
      res.send(results);
    }
  );
});

//insert participant
app.post("/participants/add/", (req, res) => {
  let query = connection.query(
    "Insert into participant values(null,?,?,0,0)",
    [req.body.userId, req.body.projectId],
    (err, result) => {
      if (err) console.log("Error");
      res.send(`Participant with ID ${req.params.id} is added`);
    }
  );
});

//delete participant
app.post("/participants/delete/", (req, res) => {
  let query = connection.query(
    "DELETE FROM participant WHERE participantId = ? AND projectId = ?",
    [req.body.participantId, req.body.projectId],
    (err, result) => {
      if (err) console.log("Error");
      res.send(
        `Participant with ID ${
          req.body.participantId
        } is deleted from project with projectId ${req.body.projectId}`
      );
    }
  );
});

//Select all participants of a project based on the id of the project
app.get("/project/participants/:id", (req, res) => {
  let query = connection.query(
    "SELECT pa.participantId, u.userId, u.name FROM participant pa, project p, user u WHERE p.projectId = ? AND p.projectId = pa.projectId AND u.userId = pa.userId",
    [req.params.id],
    (err, results) => {
      if (err) console.log("Error");
      //  console.log(results);
      res.send(results);
    }
  );
});

//insert participant
app.post("/participants/add/", (req, res) => {
  let query = connection.query(
    "Insert into participant values(null,?,?,0,0)",
    [req.body.userId, req.body.projectId],
    (err, result) => {
      if (err) console.log("Error");
      res.send(`Participant with ID ${req.params.id} is added`);
    }
  );
});

//delete participant
app.post("/participants/delete/", (req, res) => {
  let query = connection.query(
    "DELETE FROM participant WHERE participantId = ? AND projectId = ?",
    [req.body.participantId, req.body.projectId],
    (err, result) => {
      if (err) console.log("Error");
      res.send(
        `Participant with ID ${
          req.body.participantId
        } is deleted from project with projectId ${req.body.projectId}`
      );
    }
  );
});

//PARTICIPANTS REQUEST (PARTICIPANTS IN WACHTRIJ)

//select all participantsrequest for a project with the projectId
app.get("/participantrequest/:id", (req, res) => {
  let query = connection.query(
    "SELECT pa.participantrequestId, pa.userId ,u.name, u.email FROM participantrequest pa, project p, user u WHERE p.projectId = ? AND p.projectId = pa.projectId AND u.userId = pa.userId",
    [req.params.id],
    (err, results) => {
      if (err) console.log("Error");
      //  console.log(results);
      res.send(results);
    }
  );
});

//insert a new participantRequest
app.post("/participantrequest/add/", (req, res) => {
  let query = connection.query(
    "insert into participantrequest values(null,?,?)",
    [req.body.userId, req.body.projectId],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log("test: " + req.body.userId);
      res.send("participantrequest added");
    }
  );
});

//delete participantrequest
app.post("/participantrequest/delete/", (req, res) => {
  let query = connection.query(
    "Delete from participantrequest WHERE participantrequestId = ? AND projectId = ?",
    [req.body.participantrequestId, req.body.projectId],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log("test: " + req.body.participantrequestId);
      res.send("participantrequest deleted");
    }
  );
});

//LIKES

//Get all likes of a project
app.get("/projectlikes/:id", (req, res) => {
  let query = connection.query(
    "SELECT * from projectlike where projectId = ?",
    [req.params.id],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send(result);
    }
  );
});

//add like on project into database
app.get("/projectlike/add/:proj/:user", (req, res) => {
  let query = connection.query(
    "Insert into projectlike values(null,?,?,CURRENT_TIMESTAMP)",
    [req.params.proj, req.params.user],
    (err, result) => {
      if (err) console.log("Error");
      //  console.log(result);
      res.send(result);
    }
  );
});

//Delete like on project from database
app.get("/projectlike/delete/:proj/:user", (req, res) => {
  let query = connection.query(
    "delete from projectlike where projectId= ? AND userId = ?",
    [req.params.proj, req.params.user],
    (err, result) => {
      if (err) console.log("Error");
      res.send(result);
    }
  );
});

//RATINGS

//add a rating to a user
app.post("/rating/insert/", (req, res) => {
  console.log("test");
  let query = connection.query(
    "insert into ratedUser values(?,?,null,?)",
    [req.body.rateduserId, req.body.score, req.body.projectId],
    (err, result) => {
      if (err) console.log("Error:" + err);
      res.send("rating added");
    }
  );
});

//update a rating to a user
app.post("/rating/update/", (req, res) => {
  console.log("test");
  let query = connection.query(
    "UPDATE ratedUser SET score = ? WHERE rateduserId = ? AND projectId = ?",
    [req.body.score, req.body.rateduserId, req.body.projectId],
    (err, result) => {
      if (err) console.log("Error:" + err);
      res.send("rating added");
    }
  );
});

//select users that are rated by a user with the given ID
app.get("/rateduser/:projectId/", (req, res) => {
  let query = connection.query(
    "select * from ratedUser where projectId= ?",
    [req.params.projectId],
    (err, result) => {
      if (err) console.log("Error");
      res.send(result);
    }
  );
});

//Get rating of a user in a project
app.get("/userRating/:projectId/:userId", (req, res) => {
  let query = connection.query(
    "select * from ratedUser where projectId= ? AND rateduserId = ?",
    [req.params.projectId, req.params.userId],
    (err, result) => {
      if (err) console.log("Error");
      res.send(result);
    }
  );
});

//LEADERBOARD

//select users and their rating
app.get("/LeaderbordUser/", (req, res) => {
  let query = connection.query(
    "SELECT u.name,u.userId , ROUND(AVG(score), 1) AS 'score' FROM ratedUser r, user u WHERE rateduserId >= 1 AND r.rateduserId = u.userId GROUP BY u.userId ORDER BY score DESC;",
    (err, result) => {
      if (err) console.log("Error");
      res.send(result);
    }
  );
});

//select users and their rating
app.get("/LeaderbordProject/", (req, res) => {
  let query = connection.query(
    "SELECT p.name, p.projectId , COUNT(pl.projectId) AS 'score' FROM project p, projectlike pl WHERE p.projectId >= 1 AND p.projectId = pl.projectId GROUP BY p.projectId ORDER BY COUNT(pl.projectId) DESC;",
    (err, result) => {
      if (err) console.log("Error");
      res.send(result);
    }
  );
});

app.listen("5000", () => console.log("Server started on port 5000"));
