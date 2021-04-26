const mongoose = require('mongoose');

const maisonSchema = mongoose.Schema({
    type: String,
    titre: String,
    desc: String,
    img: String,
    prix: String,
    ville: String,
    prix: Number,
    dimension: String,
    nom: String,
    prenom: String,
    adresse: String,
    telephone: Number
    
})
module.exports = mongoose("Maisons",maisonSchema)
