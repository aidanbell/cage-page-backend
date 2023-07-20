const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { OAuth2Client } = require("google-auth-library");
const JWT = require("jsonwebtoken");

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET
);

router.post("/google", async (req, res) =>{
  console.log(req.body.credential)
  const ticket = await client.verifyIdToken({
    idToken: req.body.credential,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  console.log(ticket)
  const payload = ticket.getPayload();
  if (payload) {
    let user = await User.findOne({googleId: payload.sub})
    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        picture: payload.picture
      })
    }
    const token = JWT.sign({user}, process.env.JWT_SECRET)
    console.log(token)
    return res.status(200).json(token)
  }
  res.status(403).json({message: "Invalid credential"})
})

router.get('/user', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const payload = JWT.verify(token, process.env.JWT_SECRET)
  const user = await User.findById(payload.user._id).populate('watched')
  if (user) {
    const userDoc = user.toObject()
    return res.status(200).json(userDoc)
  }
  return res.status(400)
})

router.get('/refreshToken', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const payload = JWT.verify(token, process.env.JWT_SECRET)
  const user = await User.findById(payload.user._id).populate('watched')
  if (user) {
    const token = JWT.sign({user}, process.env.JWT_SECRET)
    return res.status(200).json(token)
  }
  return res.status(400)
})


module.exports = router;
