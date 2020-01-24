var express = require('express');
var router = express.Router();
const db = require('./pgExport');



router.get("/getAllUsers/", async (req, res, next) => {
  try {
    let response = await db.any("SELECT * FROM users;");
    res.json({
      status: "success",
      body: response
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error: something went wrong"
    })
  }
})


router.get("/logged-in/", async (req, res) => {
  try {

    let response = await db.one("SELECT email FROM users WHERE loggedIn= true ;", req.body.loggedIn);
    res.json({
      status: "success",
      body: response
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error: something went wrong"
    })
  }
})


router.post("/log-in/:email",  async (req, res) => {
  let email = req.params.email
  try {
    let response = await db.any("UPDATE users SET loggedIn = true WHERE email = $1", email)
    res.json({
      status: "success",
      message: `${email} logged in`
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "fail",
      message: "Error: something went wrong"
    })
  }
})


router.post("/log-out", async (req, res) => {
  try {
    let response = await db.any("UPDATE users SET loggedIn = false WHERE loggedIn = true")
    res.json({
      status: "success",
      body: response
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error: something went wrong"
    })
  }
})



router.post("/sign-up/",  async(req,res) =>{
  try {
    let insertQuery = `
  INSERT INTO users(email, img_url, loggedIn)
  VALUES($1, $2, $3);
  `
    await db.none(insertQuery, [req.body.email, req.body.img_url, true]);
    res.json({
      body: req.body,
      message: `User registration was successful!`
    })
  } catch (error) {
    res.json({
      message: `There was an error!`
    })
  }
})



router.get("/email/:email", async(req,res) =>{
  let email = req.params.email
  try{
    let response = await db.one('SELECT *  FROM users WHERE email = $1', email)
    res.json({
      status: "success",
      body: response
    })
  }catch(error){
    res.status(500).json({
      status: "fail",
      message: "Error: something went wrong"
    })
  }
})



router.get("/profilepic/:id", async(req,res) => {
  let id = req.params.id
  try {
    let response = await db.any(`SELECT img_url FROM users WHERE id = $1`, id)
    res.json({
      status: "success",
      body: response
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error: something went wrong"
    })
  }
})


router.put("/profilepic/:id",  async(req,res) => {
  let id = req.params.id
  try {
    await db.none('UPDATE users SET img_url = $1 WHERE id = $2', [req.body.imgUrl, id])
    res.json({
      body: req.body,
      message: 'Profile picture changed!'
    })
  } catch (error) {
    res.json({
      message:'There was an error!'
    })
  }
})



module.exports = router;
