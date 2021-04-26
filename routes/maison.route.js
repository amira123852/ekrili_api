const express = require('express');
const router = express.Router();
const Maison = require('../db/models/maison-schema');
const maisonService = require('../services/maison-services')(Maison);


// TODO: this ressources chould be acceced only by ADMIN
router.post('/add', async function (req, res, next) {
    let {..._maison}=req.body;
    try {
        result = await maisonService.addNewHouse(_maison);
        res.json(result);
        
    } catch (error) {
       next(); 
    }
});

module.exports = router;