const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateCalculInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.pchiffre = !isEmpty(data.pchiffre) ? data.pchiffre : "";
  data.dchiffre = !isEmpty(data.dchiffre) ? data.dchiffre : "";
  data.opr = !isEmpty(data.opr) ? data.opr : "";
// Email checks
  if (Validator.isEmpty(data.pchiffre)) {
    errors.pchiffre = "Chiffre requis";
  } 
// Password checks
  if (Validator.isEmpty(data.dchiffre)) {
    errors.dchiffre = "Chiffre requis";
  }
  if (Validator.isEmpty(data.opr)) {
    errors.opr = "Opérateur requis";
  } else if (!(data.opr ==='+' || data.opr ==='x' || data.opr ==='-')){
    errors.opr = "Opérateur non valide";
  }
    return {
    errors,
    isValid: isEmpty(errors)
  };
};
