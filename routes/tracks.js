const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/session");
const customHeader = require("../middleware/customHeader");
const {
  validatorCreateItem,
  validatorGetItem,
  validatorUpdateItem,
} = require("../validators/tracks");
const {
  getItems,
  createItems,
  getItem,
  updateItems,
  deleteItems,
} = require("../controllers/tracks");
const checkRol = require("../middleware/rol");

//http://localhost/tracks GET, POST,  DELETE, PUT
/**
 * Lista los items
 */
router.get("/", getItems);
/**
 * Obtener detalle de item
 */
router.get("/:id", validatorGetItem, getItem);
/**
 * Crea un registro
 */
router.post("/", validatorCreateItem, createItems);
/**
 * ACtualiza un registro
 */
router.put("/:id", validatorGetItem, validatorCreateItem, updateItems);

/**
 * Eliminar un registro
 */
router.delete("/:id", validatorGetItem, deleteItems);

module.exports = router;
