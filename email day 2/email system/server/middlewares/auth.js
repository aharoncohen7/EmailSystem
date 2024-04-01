const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET

async function generate(user) {
    let token = jwt.sign(user, SECRET, { expiresIn: "200m" });
    return `Bearer ${token}`
}
    
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

    async function auth(req, res, next) {
        try{
            // let token = req.headers.autherization?.split('Bearer ')[1]
            let user = { _id: "660a971c19b3b4f72409aef3", email: "aharoncohen7@gmail.com" }//jwt.verify(token,secret)
            req.user = user
            next()
        }
        catch{
            res.sendStatus(401)
        }
    }
    
    


    
module.exports = {
    validate,
    generate,
    auth
}
