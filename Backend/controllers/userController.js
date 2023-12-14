const log = require("../lib/log");
const User = require("../models/users");
const bcryptjs = require("bcryptjs");

exports.createUser = async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    try {
       const response = await User.createUser(username, password);
       res.status(200).send(response); 
    } catch (error) {
        log.error("USerController", error);
        return res.status(500).send({message: "Error en servidor", error: error})
    }
}

exports.getUser = async (req,res)=>{
    const id = req.params.id;
    try {
       const response = await User.getUser(id);
       res.status(200).send(response); 
    } catch (error) {
        log.error("USerController", error);
        return res.status(500).send({message: "Error en servidor", error: error})
    }
}

exports.getAllUsers = async (req,res)=>{
    try {
       const response = await User.getAllUsers();
       res.status(200).send(response); 
    } catch (error) {
        log.error("USerController", error);
        return res.status(500).send({message: "Error en servidor", error: error})
    }
}

exports.updateUser = async (req,res)=>{
    const id = req.params.id;
    const username = req.body.username;
    const password = req.body.password;
    const obUser = {
        username: username,
        password: password
    }
    
    try {
       const response = await User.updateUser(id, obUser);
       res.status(200).send(response); 
    } catch (error) {
        log.error("USerController", error);
        return res.status(500).send({message: "Error en servidor", error: error})
    }
}

exports.deleteUser = async (req,res)=>{
    const id = req.params.id;

    try {
       const response = await User.deleteUser(id);
       res.status(200).send(response); 
    } catch (error) {
        log.error("USerController", error);
        return res.status(500).send({message: "Error en servidor", error: error})
    }
}
