const express = require("express");
const router = express.Router();
const { validatorRegister, validatorLogin } = require("../validators/auth");
const { loginCtrl, registerCtrl } = require("../controllers/auth");
/**
 * Crea un registro
 */
//TODO http://localhost:3002/api/auth/login
//TODO http://localhost:3002/api/auth/register

router.post("/register", validatorRegister, registerCtrl);

router.post("/login", validatorLogin, loginCtrl);

module.exports = router;
