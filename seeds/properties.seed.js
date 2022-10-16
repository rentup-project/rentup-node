const PROPERTIES = require("../data/properties.data.json");
const mongoose = require("mongoose");
const Property = require("../models/Property.model");
require("../config/db.config");

mongoose.connection.once("open", () => {
    Property.create(PROPERTIES)
    .then((createdProperties) => {
      console.log("📗 📖 Creating Properties...");
      return mongoose.connection.close();
    })
    .then(() => {
      console.log("Connection closed");
      process.exit(1);
    })
    .catch((err) => {
      console.error(err);
      process.exit(0);
    });
});
