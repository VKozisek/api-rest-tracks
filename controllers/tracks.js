const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

/**
 * Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const user = req.user;
    const data = await tracksModel.find({});
    res.send({ data, user });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR GET ITEMS");
  }
};
/**
 * Obtener un detalle
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.findById(id);
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};
/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItems = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await tracksModel.create(body);
    res.status(201);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR CREATE ITEMS");
  }
};
/**
 * Actualizar un registro
 * @param {*} req
 * @param {*} res
 */
const updateItems = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await tracksModel.findOneAndUpdate(id, body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR UPDATE ITEMS");
  }
};
/**
 * Eliminar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItems = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const deleteResponse = await tracksModel.deleteById({ _id: id });
    const data = {
      deleted: deleteResponse.matchedCount,
    };
    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR DELETE ITEM");
  }
};

module.exports = { getItems, getItem, createItems, updateItems, deleteItems };
