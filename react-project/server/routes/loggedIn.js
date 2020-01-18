var express = require('express');
var router = express.Router();
const db = require('./pgExport');



const getAllLoggedIn = async (req, res, next) => {
    try {
        let response = await db.any('SELECT * FROM loggedIn')
        res.json({
            status: "success",
            // message: req.get('host') + req.originalUrl,
            body: response

        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Error: something went wrong"
        })
    }
}

const changeLoggedInStatus = async (req, res, next) => {
    try {
        let email = req.params.id
   
   
        let updateQuery = 'UPDATE loggedIn SET loginStatus = $1 WHERE email = $2'
        await db.none(updateQuery, [req.body.loginStatus, email ])
        console.log(req.body.loginStatus)
        
        res.json({
            status: "success",
            message: `Altered Sucess`,
            body: req.body
          });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Error: something went wrong"
        })
    }
}



const loginNewUser = async (req, res, next) => {
    try {   
        let insertQuery = `
        INSERT INTO loggedIn(email, loginStatus, userId)
        VALUES($1, $2, $3);
        `
        await db.none(insertQuery, [req.params.email, req.body.loginStatus, parseInt(req.body.userId) ]);
        
        res.json({
            body: req.body,
            message: `User registration was successful!`
          })

    } catch (error) {
         res.json({
        message: `There was an error!`
      })
    }
}



router.get("/", getAllLoggedIn);
router.patch("/:email", changeLoggedInStatus)
router.post("/:email", loginNewUser)


module.exports = router;