const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = async function(req, res, next) {
  // parse token from the request
  const token = req.headers.authorization.split(' ')[1] || req.body.token || req.query.token
  // if no token, return Unauthorized
  if (!token) return res.status(401).json({message: 'No Token'})
  // otherwise, try to decode the token
  try {
    // decode the token
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // if successful, set req.user to the decoded payload
    const user = await User.findById(payload.user._id)
    req.user = user
    // invoke next middleware function
    next()
  }
  catch(err) {
    // otherwise, return Unauthorized
    return res.status(401).json({message: 'Unauthorized', err: err.message})
  }
}
