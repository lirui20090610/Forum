const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//User Model
const Post = require('../../models/Post');


// @route Post api/posts
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



module.exports = router;