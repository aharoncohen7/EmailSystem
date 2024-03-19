const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET

// async function generate(user) {
//     let token = jwt.sign(user, SECRET, { expiresIn: "200m" });
//     return `Bearer ${token}`
// }
    
    async function validate(req, res, next) {
        try {
            let token = req.headers.authorization?.split('Bearer ')[1] || "null";
            // let userFromToken = jwt.verify(token, SECRET)
            // req.body.from = userFromToken._id;
            req.body.from = {"id": token};
            // console.log(req.body)
            next();
        } catch (err) {
            console.error(err);
            // res.sendStatus(401);
            res.status(401).json({ error: 'Token expired' });
    }

    }

  




    
module.exports = {
    validate,
    // generate
   
}
