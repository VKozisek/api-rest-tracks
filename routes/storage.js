const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const customHeader = require("../middleware/customHeader");
const { validatorGetItem } = require("../validators/storage");
const {
  createItems,
  getItem,
  getItems,
  deleteItems,
} = require("../controllers/storage");
//TODO http://localhost:3001/api/storage

/**
 * Obtener lita de items
 */
router.get("/", getItems);
/**
 * Detalle de Item
 */
router.get("/:id", validatorGetItem, getItem);
/**
 * Eliminar Item
 */
router.delete("/:id", validatorGetItem, deleteItems);

/**
 * Crear Item
 */
//uploadMiddleware.multi (varios archivos)
router.post("/", uploadMiddleware.single("myFile"), createItems);

module.exports = router;
