const { Connection } = require('./db');
const ObjectId = require('mongodb').ObjectId;
const bcryptjs = require("bcryptjs");
//json web token

// Create a User
const createUser = async (username, password) => {
  const db = Connection.db
  const collection = db.collection("users");
  try {
    let exists = await collection.findOne( { username: username } );
  
    if (!exists) {
      // Hash Password
      const salt = await bcryptjs.genSalt(10);
      const passwordHashed = await bcryptjs.hash(password, salt);

      const user = await collection.insertOne({
        username: username,
        password: passwordHashed,      
        createdAt: new Date(),
        updatedAt: new Date()
      });


      return { message: "User created successfully", data: user };
    } else {
      return { message: "User already exists", data: exists };
    }
  } catch (error) {
    throw error;
  } 
};



// Read a User
const getUser = async (id) => {
  let oid = new ObjectId(id);
  const db = Connection.db
  const collection = db.collection("users");
  let user = await collection.findOne( { _id: oid } );
  try {
    return { message: "User found", data: user };
  } catch (error) {
    return { message: "Unable to fetch data", errors: error };
  }
};


// Read all Users
const getAllUsers = async () => {
  try {
    const db = Connection.db
    const collection = db.collection("users");
    const userData = await collection.find({}).toArray();
    return { message: "Users found", data: userData };
  } catch (error) {
    return { message: "Unable to fetch data", errors: error };
  }
};

const updateUser = async (id, obUser) => {
  try {
    const db = Connection.db
    const collection = db.collection("users");

    const salt = await bcryptjs.genSalt(10);
    const passwordHashed = await bcryptjs.hash(obUser.password, salt);

    const userData = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          username: obUser.username,
          password: passwordHashed,
          updatedAt: new Date(),
        },
      },
      { returnOriginal: false }
    );
    return { message: "User updated successfully", data: userData };
  } catch (error) {
    return { message: "Unable to update data", errors: error };
  }
}

const deleteUser = async (id) => {
  try {
    const db = Connection.db
    const collection = db.collection("users");
    const userData = await collection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    return { message: "User deleted successfully", data: userData };
  } catch (error) {
    return { message: "Unable to delete data", errors: error };
  }
}

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
}