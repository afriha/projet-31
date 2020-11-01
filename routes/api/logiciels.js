const express = require("express");
const router = express.Router();
const validateCalculInput = require("../../validation/calculatrice");
const passport = require("passport");

// Tracing
const initTracer = require("../tracing")
const tracer = initTracer("Calculatrice");
router.post("/calculatrice", passport.authenticate("jwt", { session: false }),
  (req, res) => {
  const span = tracer.startSpan("Calculatrice");
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
  res.json({ stdout : resultat })
  span.finish();
});
module.exports = router;