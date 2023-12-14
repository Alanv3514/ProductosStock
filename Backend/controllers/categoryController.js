const category = require("../models/category");
const log = require("../lib/log");


exports.getAllCategories = async (req,res)=>{
    try {
        const response = await category.getAllCategories();
        return res.status(200).send(response)
    } catch (error) {
        log.error("CategoryController", error);
        return res.status(500).send({message: "Error en servidor", error: error});
    }
}

exports.getCategory = async (req,res)=>{
    try {
        const id = req.params.id
        const response = await category.getCategory(id);
        return res.status(200).send(response)
    } catch (error) {
        log.error("CategoryController", error);
        return res.status(500).send({message: "Error en servidor", error: error});
    }
    }

    exports.addCategory = async(req, res) => {
        try {            
            const name = req.body.name;
            const description = req.body.description;
            const response = await category.addCategory(name, description);
            return res.status(200).send(response)
        } catch (error) {
            log.error("CategoryController", error);
            return res.status(500).send({message: "Error en servidor", error: error});
        }
    }


    exports.updateCategory = async (req, res) => {
        try {            
            const { name, description }= req.body;
            const response = await category.updateCategory(name, description);
            return res.status(200).send(response)
        } catch (error) {
            log.error("CategoryController", error);
            return res.status(500).send({message: "Error en servidor", error: error});
        }
        
    }
<<<<<<< HEAD

    exports.deleteCategory = async (req, res) => {
        try {            
            const _id=req.params.id;
            const response = await category.deleteCategory(_id);
=======
    exports.deleteCategory = async (req, res) => {
        try {            
            const id=req.paramas.id;
            const response = await category.deleteCategory(id);
>>>>>>> dde2716cf012010ca6455e7c93594a896571e97a
            return res.status(200).send(response)
        } catch (error) {
            log.error("CategoryController", error);
            return res.status(500).send({message: "Error en servidor", error: error});
        }
        
    }
