const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Validator = require("validator");
const isEmpty = require("is-empty");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");
const Token = require("../../models/Token");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
const { errors, isValid } = validateRegisterInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
const email = req.body.email.toLowerCase();
User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email existe dèjà" });
    } 
const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
// Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(500).json({ error: err.message });
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) return res.status(500).json({ error: err.message });
          newUser.password = hash;
          newUser
          .save()
          .then(() => {
            
      // Save the verification token
      const newToken = new Token({ _userId: newUser._id, token: crypto.randomBytes(16).toString('hex')});
            newToken
            .save(err => {
              if (err) { 
                return res.status(500).json({ error: err.message }); 
              }
              const transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRIDUSER, pass: process.env.SENDGRIDPASS} });
              const mailOptions = { from: 'no-reply@projte31.com', to: newUser.email, subject: 'Verification du compte', text: 'Bonjour'+newUser.name+'\n\n' + 'Verifier votre compte en cliquant sur ce lien: \nhttps:\/\/' + process.env.FQDN + '\/confirmation\/' + newToken.token + '.\n' };
              transporter.sendMail(mailOptions, err => {
              if (err) { 
                return res.status(500).json({ error: err.message }); 
              }
              res.status(200).json('Inscription réussie! Un email de verification a été envoyé à ' + newUser.email + '.');
              });
            });
          })
          .catch(err => res.status(500).json({ error: err.message }));
        });
      });
    })
    .catch(err => res.status(500).json({ error: err.message }));
    });
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
const { errors, isValid } = validateLoginInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
const email = req.body.email.toLowerCase();
const password = req.body.password;
// Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email non trouvé" });
    }
    if (!user.isVerified) {
      return res.status(401).json({ notVerified : "Email non vérifié! Consultez votre boite mail." }); 
    }
// Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
// Sign token
        jwt.sign(
          payload,
          process.env.SECRET,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Mot de passe incorrect" });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
  })
  .catch(err => res.status(500).json({ error: err.message }));
});

// @route GET api/users/currentuser
// @desc Return current user
// @access Private
router.get( "/currentuser", passport.authenticate("jwt", { session: false }),(req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
});

// @route GET api/users/confirmation
// @desc Confirm user Token
router.post('/confirmation', (req, res) => {
  let errors ={};
  let email = req.body.email.toLowerCase();
  email = !isEmpty(email) ? email : "";
// Email checks
  if (Validator.isEmpty(email)) {
    errors.email = "Email requis";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email invalide";
  }
  const isValid = isEmpty(errors);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Token.findOne({ token: req.body.token }, (err, token) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!token) {
      return res.status(400).json({ nonValide : 'Token invalide. Votre token s\'est peut etre expirée.\n' });
    }
    // If we found a token, find a matching user
    User.findOne({ _id: token._userId, email: email }).then(user => {
        if (!user) 
          return res.status(400).json({ nonTrouve: 'Aucun utilisateur correspondant trouvé. Vérifiez votre email'});
        if (user.isVerified)
          return res.status(400).json({ alreadyVerified: 'L\'utilisateur est déja verifié.'});
        // Verify and save the user
        user.isVerified = true;
        user
        .save()
        .then(() => res.status(200).json("Le compte a été vérifié. Connectez vous!."))
        .catch(err => res.status(500).json({ error: err.message }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
  })
})
// @route GET api/users/resend
// @desc Resend user token
router.post('/resend', (req, res) => {
  let errors ={};
  let email = req.body.email.toLowerCase();
  email = !isEmpty(email) ? email : "";
// Email checks
  if (Validator.isEmpty(email)) {
    errors.email = "Email requis";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email invalide";
  }
  const isValid = isEmpty(errors);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: email }).then(user => {
    if (!user) 
      return res.status(400).json({ nonTrouve: 'Aucun utilisateur valide trouvé pour cet email.'});
    if (user.isVerified) 
      return res.status(400).json({ alreadyVerified: 'L\'utilisateur est déja verifié.'});

    // Create a verification token, save it, and send email
    var newToken = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

    // Save the token
    newToken.save(err => {
        if (err) { 
          return res.status(500).json({ error: err.message }); 
        }
        // Send the email
        const transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRIDUSER, pass: process.env.SENDGRIDPASS} });
        const mailOptions = { from: 'no-reply@projte31.com', to: user.email, subject: 'Verification du compte', text: 'Bonjour'+user.name+'\n\n' + 'Verifiez votre compte en cliquant sur ce lien: \nhttps:\/\/' + process.env.FQDN + '\/confirmation\/' + newToken.token + '.\n' };
        transporter.sendMail(mailOptions, err => {
          if (err) { 
            return res.status(500).json({ error: err.message }); 
            }
          res.status(200).json('Un email de verification a été envoyé à ' + user.email + '.');
        });
    })
  })
  .catch(err => res.status(500).json({ error: err.message }));
})
module.exports = router;
