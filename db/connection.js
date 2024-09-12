const mongoose = require('mongoose');
const connectDB = async (connectionString, databaseName)=>{
  try {
    await mongoose.connect(`${connectionString}/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`)
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = connectDB;
