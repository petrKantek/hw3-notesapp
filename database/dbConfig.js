const mongoose = require("mongoose");
require("dotenv").config();

const connOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_URI = process.env.AZURE_COSMOS_CONNECTIONSTRING;

const connectToDB = async () => {
  try {
    const connect = mongoose.connect(MONGO_URI, connOptions);
    if (connect) console.log(`Mongodb connected - ${connect.connection.host}`);
  } catch (err) {
    console.log(`Database error ${err}`);
  }
};

module.exports = connectToDB;