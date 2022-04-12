const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key;
    if (apiKey === "vkozisck-01") {
      next();
    } else {
      res.status(403);
      res.send({ error: "API KEY NO ES CORRECTO" });
    }
  } catch (e) {
    res.status(403);
    res.send({ error: "ALGO OCURRIO EN EL CUSTOM HEADER" });
  }
};

module.exports = customHeader;
