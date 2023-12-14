const { Connection } = require('./db');
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const auth = async (username, password)=>{
    try {
    const db = Connection.db
    const collection = db.collection("users");    
    let user = await collection.findOne({ username: username });
    if (!user) {
      return { message: "User doesn't exists" };
    }
  
    let passwordOk = await bcryptjs.compare(password, user.password);
  
    if (!passwordOk) {
      return { message: "Wrong password" };
    }
  
    const payload = {
      user_id: user._id,
      user_name: user.username,      
    };
  
    const token = jwt.sign(
      payload,
      process.env.JWT_KEY,
      { expiresIn: 36000 }      
    );
        return {token} ;
    } catch (error) {
      throw error;
    }
  
}

module.exports ={
    auth
}