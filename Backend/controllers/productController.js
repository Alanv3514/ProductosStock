const products = require("../models/products");
const log = require("../lib/log");

exports.getAllProducts = async (req, res)=>{
    try {
        const response = await products.getAllProducts();
        return res.status(200).send(response)
    } catch (error) {
        log.error("ProductController", error);
        return res.status(500).send({message: "Error en servidor", error: error})
    }
}
exports.addProducts = async (req, res, next) => {
    console.log(req.body);
   const {name, description, brand, amount, category} = req.body;
   try {
    const response = await products.addProduct(name, description, brand, amount, category)
    return res.status(200).send(response)
   } catch (error) {
    log.error("ProductController", error);
    return res.status(500).send({message: "Error en servidor", error: error})
   }
}

exports.getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await products.getProductById(id);
        return res.status(200).send(response)
    } catch (error) {
        log.error("ProductController", error);
        return res.status(500).send({message: "Error en servidor", error: error})
    }
}

exports.getProductByName = async (req, res) => {
    const name = req.params.name;
    try {
        const response = await products.getProductByName(name);
        return res.status(200).send(response)
    } catch (error) {
        log.error("ProductController", error);
        return res.status(500).send({message: "Error en servidor", error: error})
    }
}

exports.updateProduct = async (req, res) => {
    const {id, name, description, brand, amount, category} = req.body;
    try {
        const response = await products.updateProduct(id,name, description, brand, amount, category);
        return res.status(200).send(response)
    } catch (error) {
        log.error("ProductController", error);
        return res.status(500).send({message: "Error en servidor", error: error})
    }
}

exports.deleteProduct = async (req, res) => {
    const id = req.params.id
    try {
        const response = await products.deleteProduct(id);
        return res.status(200).send(response)
    } catch (error) {
        log.error("ProductController", error);
        return res.status(500).send({message: "Error en servidor", error: error})
    }
}