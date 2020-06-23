const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Create Schema
const EmailSchema = new schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    userID: {
        type: String,
    },
    verificationCode: {
        type: String,
        maxlength: 6

    }
});

module.exports = Email = mongoose.model('email', EmailSchema);