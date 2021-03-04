const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId && req.body.role != "admin"){
            throw 'user id non valable !';
        } else {
            if(role != "admin" && role != "secretaire"){
                res.status(401).json("vous n'avez pas le droit d'accéder a cette requête")

            }
            next();
        }
    }
    catch (error){
        res.status(401).json({error: error | 'Requête non auth'})
    }

};
