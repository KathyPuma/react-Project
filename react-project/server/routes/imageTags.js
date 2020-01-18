const express = require('express');
const router = express.Router();
const db = require('./pgExport');
router.get('/', async (req, res) => {
    try {
        let response = await db.any('SELECT * FROM image_tags;');
       
        res.json({
            success: true,
            body: response
        })
    }
    catch(err) {
        res.send({
            success: false,
            error: "Data does not exist"
        })
    }
}) 
router.post('/addTagToImage/', async (req,  res) => {
    try {  
        let insertQuery = `INSERT INTO image_tags(tag_id, img_id)
        VALUES ($1, $2);`
        db.none(insertQuery, [req.body.tag_id, req.body.img_id])
        res.json({
            success: true,
            body:req.body,
            message: "tags and Image Inserted"
        })
    }
    catch(err) {
        res.send({
            success: false,
            error: "Cannot add tag with images"
        })
    }
})
module.exports = router;