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
        // Check if the token contains the user ID or a specific field you're looking for
        if (!data || !data._id) {
            return res.status(401).send({ error: "Invalid token" });
        }
        req.user = data._id;
        console.log(req.user,"req.user")
        next();
    }
    catch {
        console.error("Error in userMiddleware: ", error.message);
        res.status(401).send({ error: "catch: please authenticate using a valid token" })
    }

}

module.exports = userMiddleware;