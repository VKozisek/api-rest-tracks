const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${__dirname}/../storage`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    //TODO mi-foto.png mi-cv-pdf
    const ext = file.originalname.split(".").pop(); //TODO ["name","png"]
    const filename = `file-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

//multer utiliza el storage como un middleware
//middleware: especie de funcion entre la ruta y el controlador
const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
