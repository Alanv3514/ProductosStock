const { ObjectId } = require('mongodb');
const { Connection } = require('./db');

const getAllProducts = async ()=>{
    const db = Connection.db;
    const productos = db.collection("productos");
    try {
        const products = await productos.find({}).toArray();
        return {message:"", data:products}
    } catch (error) {
        throw error
    }
}

const addProduct = async (name, description, brand, amount, category)=>{
    const db = Connection.db;
    const productos = db.collection("productos");
    try {
        const product = await productos.insertOne(
           { name, description, brand, amount, category});
        if (!product){
            return {message: "No se pudo crear el producto"}
        }else{
            return {message: "Producto creado", data: product}
        }
    } catch (error) {
        throw error;
    }
}

const getProductById = async (id)=>{
    const db = Connection.db;
    const productos = db.collection("productos");
    try {
        const product = await productos.findOne({_id: id})
        if (product) {
            return {message: "Producto Encontrado", data: product}
        } else {
            return {message: "Producto No Encontrado", data: null}
        }
    } catch (error) {
        throw error;
    }
}

const getProductByName = async (name)=>{
    const db = Connection.db;
    const productos = db.collection("productos");
    try {
        const product = await productos.findOne({name: name})
        if (product) {
            return {message: "Producto Encontrado", data: product}
        } else {
            return {message: "Producto No Encontrado", data: null}
        }
    } catch (error) {
        throw error;
    }
}

const deleteProduct = async (id)=>{
    const db = Connection.db;
    const productos = db.collection("productos");
    try {
        const deleteP = await productos.findOneAndDelete({_id: new ObjectId(id)});
        console.log(deleteP);
        return {message: "Productos deleted", data: null}
    } catch (error) {
        throw error;
    }
}

const updateProduct = async (id, name, description, brand, amount, category )=>{
    const db = Connection.db;
    const productos = db.collection("productos");
    try {
        await productos.findOneAndUpdate({_id: new ObjectId(id)}, {
            $set: {
                name: name,
                description: description,
                brand: brand,
                amount: amount,
                category: category
            }           
        })
        console.log(category);
        return {message: "Producto updated", data: null}
    } catch (error) {
        throw error
    }
}

module.exports ={
    addProduct,
    getProductById,
    getProductByName,
    deleteProduct,
    updateProduct,
    getAllProducts,
}