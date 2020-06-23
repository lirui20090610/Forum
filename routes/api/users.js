const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


//User Model
const User = require('../../models/User');
//EMAIL Model
const Email = require('../../models/Email');

// Email acount setting
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pandapressx@gmail.com',
        pass: 'notapassword',
    },
});

// Verification Code expire time 1s*60*10
const verificationCodeEXpire = 1000 * 60 * 10;

// @route Post api/users
// @desc Register new user
// @access Public
router.post('/', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Simple validation
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' });

            const newUser = new User({
                firstName,
                lastName,
                email,
                password
            });

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            firstName: user.firstName,
                                            lastName: user.lastName,
                                            email: user.email
                                        }
                                    });
                                }
                            )


                        });
                })
            })
        })
});


// @route Post api/users/email
// @desc Validate user's email
// @access Public
router.post('/email', (req, res) => {

    const { email } = req.body;
    // console.log(email);
    // Simple validation
    if (!email) {
        return res.status(400).json({ msg: 'Please enter your email' });
    }

    // Check for existing email
    Email.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'Email already be used' });
            res.json({ msg: 'valid email, verification code is sent.' });

            let verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

            let mailOptions = {
                //This doesn't work for Gmail, Gmail would replace it with actual user automatically.
                from: 'Panda@PandaPressX.com',
                to: email,
                subject: 'Panda Press X',
                text: `Verification code is ${verificationCode}, it is valid in 10 mins.`
            };

            // save users' email and the temporary verification code to the DB 
            const newEmail = new Email({
                email,
                verificationCode
            });

            newEmail.save().then(dbEmail =>
                console.log(dbEmail.email)
            )

            transporter.sendMail(mailOptions, (error, info) => {

                setTimeout(() => {
                    console.log(email);
                    Email.findOne({ email }).then(dbEmail => {
                        if (dbEmail) {
                            dbEmail.remove();
                        }
                    })
                }, verificationCodeEXpire);
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        })



});
module.exports = router;