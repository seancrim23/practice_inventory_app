const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    //pull the token from the authorization header
    //use jsonwebtoken to decode the token
    //pull a user using the decoded _id and also the token
    //if a user gets pulled, save it and token to the request
    //if not, throw error
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if(!user){
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
    }catch(e){
        res.status(401).send({ error: 'Please authenticate!' });
    }
};

module.exports = auth;