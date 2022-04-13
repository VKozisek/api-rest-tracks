const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { userModel } = require("../models");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NEED SESSION", 401);
      return;
    }

    const token = req.headers.authorization.split(" ").pop(); //TODO Bearer {{token}}
    const dataToken = await verifyToken(token);

    if (!dataToken) {
      handleHttpError(res, "NOT_PAY_LOAD", 401);
      return;
    }

    /* if (!dataToken._id) {
      handleHttpError(res, "ERROR_ID_TOKEN", 401);
      return;
    } */

    //const user = await userModel.findById(dataToken._id);

    const query = {
      [propertiesKey.id]: dataToken[propertiesKey.id],
    };

    console.log(query);

    const user = await userModel.findOne(query);

    /* const query = {
      [propertiesKey.id]: dataToken[propertiesKey.id],
    };*/

    req.user = user;

    next();
  } catch (error) {
    handleHttpError(res, "NOT SESSION", 401);
  }
};

module.exports = authMiddleware;
