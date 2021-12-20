const express = require("express");
const bodyParser = require("body-parser");
const {body, validationResult} = require('express-validator/check');
const {userValidator} = require('./services/validator')
const createUsr = require('./controllers/users')
const findUsr = require('./controllers/users')
const signinUsr = require('./controllers/users')
const createF = require('./controllers/files')
const findF = require('./controllers/files')
const getF = require('./controllers/files')
const deleteF = require('./controllers/files')
const updateF = require('./controllers/files')
const uploadFile = require('./middleware/upload')
const path = require('path')
const cors = require('cors')

const app = express();



app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'files')))


app.get("/", (req, res) => {
      res.json({ message: "Это стартовая страница нашего приложения" });
    });
app.get("/users", findUsr.findAllUsers)
app.post("/signup", userValidator, createUsr.createUser )
app.post("/signin", userValidator, signinUsr.signinUser )
app.post("/file/upload", uploadFile, createF.createFile )
app.get("/file/list", findF.findAllFiles )
app.get("/file/:id", getF.getFile )
app.delete("/file/delete/:id", deleteF.deleteFile)
app.put("/file/update/:id", updateF.updateFile)


app.listen(3001, () => {
      console.log("Сервер запущен на 3001 порту");
    });




