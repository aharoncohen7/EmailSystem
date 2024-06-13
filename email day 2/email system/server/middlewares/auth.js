const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET

async function generate(user) {
    let token = jwt.sign(user, SECRET, { expiresIn: "300m" });
    return `Bearer ${token}`
}


async function auth(req, res, next) {
    if(!req.headers.authorization){
        return;
    }
    try {
     
        let token = req.headers.authorization?.split('Bearer ')[1] || "null";
        if(!token) throw "no token provided"
        let userIdFromToken = jwt.verify(token, SECRET);
        if(!userIdFromToken) throw "not correct"
        req.user = userIdFromToken
        next()
    }
    catch (error) {
        if (typeof error === 'object' && error.name === 'TokenExpiredError') {
          // טיפול בטוקן שפג תוקפו
          console.error('Token expired: ', error.message);
          res.status(401).json({ error: 'Token expired' });
          return; 
        } else {
          // שגיאת שרת פנימית
          console.error(error);
          res.sendStatus(500); 
          return;
        }
      }
}





module.exports = {
    generate,
    auth
}
