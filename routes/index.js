const express = require("express");
const fs = require("fs");
const router = express.Router();

const PATH_ROUTES = __dirname;
const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};
const a = fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file); //users, storage, tracks

  if (name !== "index") {
    console.log(`Cargando ruta ${name}`);
    router.use(`/${name}`, require(`./${file}`)); //http://localhost:3000/api/tracks
  }
});

module.exports = router;
