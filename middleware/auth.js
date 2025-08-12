const jwt = require('jsonwebtoken');
const SECRET_KEY = '1234';


const auth = (roles = []) =>{
    return (req, res, next)=>{
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) return res.status(401).json({"message" : "Unothorized"});

        try{
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;
            if(roles.length && !roles.includes(decoded.role)){
                return res.status(203).json({"message" : "Forbidden"});
            }

            next();
        }catch(err){
            return res.status(401).json({"message" : "Invalid Token"})
        }
    }
}



module.exports = auth;