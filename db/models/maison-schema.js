const mongoose = require('mongoose');
const User=require('./user-schema');



//Define a schema
const Schema = mongoose.Schema;

/**
 * Maison Schema
 */


const MaisonSchema = new Schema({
    type_immobilier:{
        type: String,
        required : true
    },
    description:{
        type: String,
        required: true
    },
    photo_url:{
        type:String,
        default:"assets/default_house.png"
    },
    prix:{
        type:Number
    },
    annonceur:{type:Schema.Types.ObjectId,ref:"User"}

}, {
    timestamps: true
});


module.exports = mongoose.model('Maison', MaisonSchema);