// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "hospitalRegister"
// });


// con.connect(function(err) {
//   if(err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE hospitalRegister", function(err, result) {
//     if(err) throw err;
//     console.log("Database created!")
//   });
// });

// con.connect(function(err) {
//   if(err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE hospital (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), birthday DATE, phone VARCHAR(255), email VARCHAR(255), address VARCHAR(255))";
//   con.query(sql, function(err, result) {
//     if(err) throw err;
//     console.log("Table Created!");
//   })
// })

// con.connect(function(err) {
//   if(err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO hospital (name, birthday, phone, email, address) VALUES ('dante', '2002-10-22', '20349434', 'ydante1022@gmail.com', 'london')";
//   con.query(sql, function(err,result) {
//     if(err) throw err;
//     console.log("1 record inserted");
//     // console.log("result:::", result.database);
//   });
// });




const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors");
const fileUpload = require('express-fileupload');
var mysql = require('mysql');
const app = express()


app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());
app.use(cors());


var con = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database: 'mysql'
});


app.post('/app', function(req, res) {
  let name, birthday, phonenumber, email, address, imageFile, uploadPath;
  console.log("req::", req);

  if(!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send("No body were formdata");
  }
  name = req.body.name;
  birthday = req.body.birthday;
  phonenumber = req.body.phonenumber;
  email = req.body.email;
  address = req.body.address;

//image upload

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  imageFile = req.files.avatar;
  fileName = req.files.avatar.name;
  uploadPath = __dirname + '/uploads/' + fileName;
  console.log("uploadPath:::", uploadPath);
  imageFile.mv(uploadPath, function(err) {
    if(err) 
      return res.status(500).send(err);
    res.send(uploadPath);
  })


  console.log("name:::", name);
  console.log("birthday:::", birthday);
  console.log("phonenumber:::", phonenumber);
  console.log("email:::", email);

  con.connect(function(err) {
    if(err) throw err;
    console.log("Connected!");
    var sql = `INSERT INTO hospital (avatar, name, birthday, phone, email, address) VALUES ('${uploadPath}', '${name}', '${birthday}', '${phonenumber}', '${email}', '${address}')`;
    con.query(sql, function(err, result) {
      if(err) throw err;
      console.log("! record inserted");
    })
  })
});

app.listen(8000, () => console.log("Server is up"));


// con.connect(function(err) {
//   if(err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO hospital (name, birthday, phone, email, address) VALUES ('dante', '2002-10-22', '20349434', 'ydante1022@gmail.com', 'london')";
//   con.query(sql, function(err, result) {
//     if(err) throw err;
//     console.log("! record inserted");
    
//   })
// })