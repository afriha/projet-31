const express = require("express");
const router = express.Router();
const validateCalculInput = require("../../validation/calculatrice");
const passport = require("passport");

router.post("/calculatrice", passport.authenticate("jwt", { session: false }),
  (req, res) => {
const { errors, isValid } = validateCalculInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
const arguments = ({
    pchiffre: req.body.pchiffre,
    dchiffre: req.body.dchiffre,
    opr: req.body.opr
    });
let a=String(arguments.pchiffre);
let b=String(arguments.dchiffre);
let op=String(arguments.opr);
let fonc=a+op+b;
const resultat=eval(fonc);
console.log(resultat);
  res.json({ stdout : resultat })
  });
module.exports = router;