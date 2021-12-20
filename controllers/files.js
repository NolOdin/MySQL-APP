const {File} = require('../models');
const {validationResult} = require('express-validator/check');



function createFile(req, res, next) {
    try{

     const theFile = {name: req.file.originalname, extension: req.file.encoding, mimetype: req.file.mimetype, size: req.file.size}

     return File.create(theFile).then(file => {res.json(file)}).catch(error => {res.status(error.statusCode || 400).json({error: error.message})})
    }catch(err){
      console.log(err)
    }
}
 function findAllFiles (req, res) {
    

      File.findAll()
      .then(file => {res.json(file)})
      .catch(error => {res.status(error.statusCode || 400).json({error: error.message})})
    
      
};

 function getFile (req, res) {
    

      File.findOne({where: {id: req.params.id} })
                        .then(file => {res.json({file})})
                        .catch(error => {res.status(error.statusCode || 400).json({error: error.message})})
                      
      
};
 function deleteFile (req, res) {
    

      File.findOne({where: {id: req.params.id} })
      .then(file => {file.destroy()})
                        .then(file => {res.json({message: 'Файл успешно удален!'})})
                        .catch(error => {res.status(error.statusCode || 400).json({error: error.message})})
                      
      
};
 function updateFile (req, res) {
    

      File.findOne({where: {id: req.params.id} })
      .then(file => {file.update()})
                        .then(file => {res.json({message: 'Файл успешно обновлен!'})})
                        .catch(error => {res.status(error.statusCode || 400).json({error: error.message})})
                      
      
};


module.exports = {
      createFile,
      findAllFiles,
      getFile,
      deleteFile,
      updateFile
}