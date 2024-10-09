var jwt = require('jsonwebtoken');
const env = require('dotenv')
env.config()

const userMiddleware = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        console.log(req.user,"req.user")
        next();
    }
    catch {
        res.status(401).send({ error: "catch: please authenticate using a valid token" })
    }

}

module.exports = userMiddleware;