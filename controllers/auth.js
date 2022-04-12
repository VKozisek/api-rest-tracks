const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { userModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req
 * @param {*} res
 */
const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await userModel.create(body);
    dataUser.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR REGISTER USER");
  }
};

/**
 * Este controlador es el encargado de logear una persona
 * @param {*} req
 * @param {*} res
 */
const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await userModel.findOne({ email: req.email });
    //.select("password name role email");

    if (!user) {
      handleHttpError(res, "USER NOT EXIST", 404);
      return;
    }
    const hashPasword = user.password;
    const check = await compare(req.password, hashPasword);

    if (!check) {
      handleHttpError(res, "PASSWORD INVALID", 401);
      return;
    }

    user.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(user),
      user,
    };

    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR LOGIN USER");
  }
};

module.exports = { registerCtrl, loginCtrl };
