const fs = require("fs");
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;
/**
 * Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR LIST ITEMS");
  }
};
/**
 * Obtener un detalle
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await storageModel.findById(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR DETAIL ITEMS");
  }
};
/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItems = async (req, res) => {
  try {
    const { file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await storageModel.create(fileData);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR CREATE ITEMS");
  }
};
/**
 * Eliminar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItems = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const dataFile = await storageModel.findById(id);
    //const deleteResponse = await storageModel.delete({ _id: id });
    await storageModel.delete({ _id: id }); //softdelete

    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`;
    //fs.unlinkSync(filePath); //comentar para el softdelete
    const data = {
      filePath,
      deleted: 1,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR DELETE ITEMS");
  }
};

module.exports = { getItems, getItem, createItems, deleteItems };
