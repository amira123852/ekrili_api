const mongoose = require("mongoose");
const User=require('./user-schema');
const Schema = mongoose.Schema;


const MaisonSchema = new Schema({
    type_immobilier: {
        type: String,
        required: [true, 'type immobilier is required'],
        trim: true
    },
    description: {
      type: String,
      required: [true, 'description is required'],
      trim: true
  },

    Photo: {
        type: [String],
        required: [true, 'picture url is required'],
        trim: true
    },
    prix: {
      type: String,
      required: [true, 'price is required'],
      trim: true
  },
   
    annonceur: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required:[true, 'user is required']
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Maison', MaisonSchema);