const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const multer = require ('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images")
    },
    filename: (req, file, cb) => {
      let name = Date.now() + "-" + file.originalname
      cb(null, name)
    }
  })

const upload = multer ({
    storage: storage
})
// .array('file')

const multiUpload = multer ({
  storage: storage
}).array('file')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tagsRouter = require('./routes/tags')
const imagesRouter = require('./routes/images')
const imageTagsRouter = require('./routes/imageTags')
//const multiRouter = require('.routes/multi')

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tags', tagsRouter);
app.use('/images', imagesRouter)
app.use('/imageTags', imageTagsRouter)
app.use('/multi', imagesRouter)
app.post('/upload', upload.single ("image"), (req,res,next) => {

    
    let imageUrl = "http://localhost:3001/" + req.file.path.replace('public/', '')
    res.json({
        imageUrl: imageUrl,
        message: "file uploaded"
})
})



app.use("*", (req, res) => {
    res.status(404).send('Error: no such route found. Try again.');
});

module.exports = app;
