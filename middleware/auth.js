const jwt  = require("jsonwebtoken");



const getToken = (user) => {
    
    try {
         return jwt.sign({
             number: user.number,
             password: user.password
            }, 
            `somethingsecret`,   {
            expiresIn: '30m'
        });
        
    } catch (error) {
        return console.log(error.message);
    }  
}
const isAuth = (req, res, next) => {
    const token = req.headers.authorization || req.headers.Authorization;
    if(token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken,
             `somethingsecret`, 
             (error, decode)=>{
            if(error) {
                return res.status(401).send({message: 'Ошибка при создании токена!', error: error.message });
            }else {
            req.user = decode;
            return next();
            }
        });
    } else {
        return res.status(401).send({message: 'Токен не предоставляется!'});
    }

}

module.exports = { getToken, isAuth } ;