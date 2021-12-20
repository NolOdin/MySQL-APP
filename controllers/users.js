const {User} = require('../models');
const {validationResult} = require('express-validator/check');
const bcrypt =  require("bcrypt");
const {getToken, isAuth} = require('../middleware/auth');


function createUser(req, res, next) {
	 
	const errors = validationResult(req);
      if(!errors.isEmpty()) {
      	return res.status(442).json({errors: errors.array()})
      }
      //res.send(req.body)
      User.findOne({where: {number: req.body.number} }).then(
      	(user) => {
      		if(user){
      			return Promise.reject({statusCode: 422, message: 'Пользователь с таким номером уже существует!'})
      		}else {
      			const {number, password} = req.body
      			return User.create({number, password})
      		}
      	})
      .then(user => {res.json(user)})
      .catch(error => {res.status(error.statusCode || 400).json({error: error.message})})
    
}
async function signinUser (req, res) {
     try {
        const { number, password } = req.body;        
        const loggedUser = await User.findOne({where: {number: req.body.number}});  
        console.log(loggedUser)
        
         if(!loggedUser){
            return res.status(404).send({ message: 'Неверный номер или пароль!' })
         } else {
                if(password == loggedUser.password) {
                    const { number } = loggedUser;
                    return res.status(200).send({number, token:getToken(loggedUser)});
                }else {
                    return res.status(404).send({message: 'Неверные учетные данные!'});
                }
         }
   } catch (error) {     
        return res.status(500).send({error: error.message, message:"Ошибка сервера!"});
   }     
}

 function findAllUsers (req, res) {
    

      User.findAll()
      .then(user => {res.json(user)})
      .catch(error => {res.status(error.statusCode || 400).json({error: error.message})})
    
 	
};


 


module.exports = {
	createUser,
	findAllUsers,
      signinUser
}