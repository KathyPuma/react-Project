const express = require('express');
const router = express.Router();
const db = require('./pgExport');
router.get('/all', async (req, res) => {
   try {
       let images = await db.any(`SELECT * FROM images`);
       res.json({
           payload: images,
           message: `success. retrieved all images`
       });
   } catch (error) {
       res.status(500);
       res.json({
           message: `Error. Something went wrong!`
       })
       console.log(error);
   }
})
router.get('/:id', async (req, res) => {
    let id = req.params.id
   try {
       let images = await db.one(`SELECT * FROM images WHERE id = ${id}`);
       res.json({
           payload: images,
           message: `success, retrieved the image`
       });
   } catch (error) {
       res.status(500);
       res.json({
           message: `Error, Something went wrong.`
       })
       console.log(error);
   }
})
router.get('/:url', async (req, res) => {
    let url = req.params.img_src
   try {
       let images = await db.one(`SELECT id FROM images WHERE id = $1`, url);
       res.json({
           payload: images,
           message: `success, retrieved the image`
       });
   } catch (error) {
       res.status(500);
       res.json({
           message: `Error, Something went wrong.`
       })
       console.log(error);
   }
})
router.put('/post', async (req, res) => {
  try {
      let insertQuery = `
      INSERT INTO images(img_src, users_id)
      VALUES($1, $2);` 
      
      await db.none(insertQuery, [req.body.img_src, req.body.users_id]);
      res.json({
          payload: req.body,
          message: `image was posted`
      })
  } catch (error) {
      res.json({
          message: `There was an error!`
      })
      console.log(error)
  }
})
router.delete('/:id', async (req, res) => {
    let id = req.params.id
    try {
        let deleteImage = await db.none(`DELETE FROM images WHERE id = ${id}`)
        res.json({
            message: `Post ${id} was deleted`
        })
    } catch (error){
        res.json({
            message: `Cannot remove post`
        })
        console.log(error);
    }
})

module.exports = router;