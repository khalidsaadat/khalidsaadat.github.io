const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

// connection to mongo DB using mongoose, uri is stored in .env file
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB: " + conn.connection.host);
  } catch (e) {
    console.log("Error connecting to DB: " + e);
  }
};

function close() {
  return mongoose.disconnect();
}

module.exports = {connectDB, close};
