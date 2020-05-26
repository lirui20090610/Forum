const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Create Schema
const PostSchema = new schema({
    title: {
        type: String,
        require: true,
        trim: true,
        maxlength: 100
    },
    userID: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true,

    },
    likes: {
        type: Number,
        default: 0,
    },
    responds: {
        type: Number,
        default: 0,
    },
    postDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);