const log = require("../lib/log");
const { auth } = require("../models/auth");

exports.auth = async (req, res) => {

  try {
    const {username, password} = req.body;
    const response = await auth(username, password);
    return res.status(200).send(response)
  } catch (error) {
    log.error("AuthController", error);
    return res.status(500).send({message: "Error en servidor", error: error})
    }
} 

