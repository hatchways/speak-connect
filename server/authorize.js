const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {

    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Access denied!Provide a token");

    try {
        const user = jwt.verify(token, config.get("jwtKey"));
        req.verified_user = user;
        next();
    }
    catch (ex) {
        console.log("Invalid token");
        res.status(400).send("Invalid token!");
    }
}