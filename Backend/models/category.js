const { Connection } = require('./db');
const ObjectId = require('mongodb').ObjectId;


const getAllCategories = async(req, res)=>{
    const db = Connection.db;
    const categorias = db.collection("categorias");
    const list = await categorias.find({}).limit(1000).toArray();
    if (list) {
        return {menssage:"Categorias Encontradas", data:list}
    } else {
        return {menssage:"Categorias No Encontradas", data:null}
    }    
}

const getCategory = async(id)=>{    
    const db = Connection.db;
    const categorias = db.collection("categorias");
    const category = await categorias.findOne({_id: id});
    if (category) {
        return {menssage:"Categoria Encontrada", data:category}
    } else {
        return {message: "Categoria No Encontrada", data:null}
    }     
}

const addCategory = async(name, description)=>{
    const db = Connection.db;
    const categorias = db.collection("categorias");
    try {
        const exists = await categorias.findOne({ _id: name });        
        if (exists) {
            return {menssage:"Categoria Existente", data:exists}
        }else{
            const category = await categorias.insertOne({_id:name, name: name, description: description});
            return {menssage:"Categoria Agregada", data:category}
        }        
    } catch (error) {        
        throw error;
    }
} 

const updateCategory = async (name, description) => {
    const db = Connection.db;
    const categorias = db.collection("categorias");
    await categorias.findOneAndUpdate({
        _id: name
    },
    {
        $set:{
            name: name,
            description: description
        }
       
    }
    )
    .then(e=>{
        if(e){
           return {menssage:"Categoria Actualizada", data:e}
        }else{
            return {menssage:"Falló la actualizacion de datos", data:e}
        }  
    })
    .catch ( err =>{
        throw err
    })
}
const deleteCategory = async (id)=>{
    const db = Connection.db;
    const categorias = db.collection("categorias");
    try {
        const deleteC = await categorias.findOneAndDelete({name: id});
        console.log(deleteC);
        return {message: "Productos deleted", data: null}
    } catch (error) {
        throw error;
    }
}
module.exports = {
    getAllCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
}
