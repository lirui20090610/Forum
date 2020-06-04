const express = require('express');
const path = require("path");
const { uuid } = require('uuidv4');
const multer = require("multer");
const router = express.Router();
const auth = require('../../middleware/auth');

//User Model
const Post = require('../../models/Post');


// @route Post api/post
// @desc user post
// @access Public
router.post('/', auth, (req, res) => {
    const { title, userID, content } = req.body;

    // Simple validation
    if (!title || !content) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // 
    const newPost = new Post({
        title,
        userID,
        content,
    });
    newPost.save().then(post => res.json(post));


});

// @route post api/post/sourceID
// @desc post an UUID for post sources
// @access Public
router.get('/sourceid', auth, (req, res) => {
    // setTimeout(function () { res.json(uuid()); }, 10000);
    res.json(uuid());

});




const storage = multer.diskStorage({
    destination: "./static/posts",
    filename: function (req, file, callback) {
        // callback(null, "IMAGE-" + path.extname(file.originalname));
        callback(null, "IMAGE-" + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024000000 },//1GB
}).single("postSRC");


// @route Post api/post/upload
// @desc user upload files
// @access Public
// router.post('/upload', auth, (req, res) => {
//     // console.log(req);
//     res.json({ msg: 'got it' });
// });

router.post('/upload', auth, upload, (req, res) => {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file);
    res.json({ msg: 'got it' });
});


module.exports = router;