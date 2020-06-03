const express = require('express');
const { uuid } = require('uuidv4');
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


// @route Post api/post/upload
// @desc user upload files
// @access Public
router.post('/upload', auth, (req, res) => {
    console.log("user uploads");
    res.json({ msg: 'got it' });
});



module.exports = router;