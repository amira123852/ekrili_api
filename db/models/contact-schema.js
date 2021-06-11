const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;

/**
 * User Schema
 */
const ContactSchema = new Schema(
  {
    nom: {
      type: String,
      trim: true,
      required: [true, "nom est obligatoire!!"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email est obligatoire!!"],
      
    },
  
    telephone: {
      type: String,
    },
    message: {
      type: String,
    },
  
   
  },
  {
    timestamps: true,
  }
);




  



module.exports = mongoose.model("Contact", ContactSchema);
