const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuthClient = async (req, res, next)=>{

    // verify authentification
   const {authorization} = req.headers

   if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
   }

   const token = authorization.split(' ')[1]

   try{
    const {_id , role} = jwt.verify(token, process.env.SECRET)

     // Fetch the user's role
     const user = await User.findOne({ _id }).select('role');

     if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }

    // Check if the user's role is 'client'
    if (user.role !== 'client') {
        return res.status(403).json({ error: 'Access denied. Only clients are authorized.' });
    }

    req.user = { _id, role };
    next()

   }catch (error){
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})

   }
}

module.exports = requireAuthClient