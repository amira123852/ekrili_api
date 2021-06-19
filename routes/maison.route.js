const express = require('express');
const router = express.Router();
const Maison = require('../db/models/maison-schema');
const User =require('../db/models/user-schema');
const maisonService = require('../services/maison-services')(Maison);
const multer =require("multer");
const storage =multer.diskStorage({
    //destination de l'image
    destination:function(req,file,callback){
      callback(null,'./uploads/');
    },
    filename:function(req,file,callback){
        callback(null,Date.now()+ '-' + file.originalname) ;
    }
});

const upload=multer({ storage: storage,})

router.post('/add', upload.array("Photo", 4), async function (req, res, next) {

   /* let user = await User.findOne({_id : req.body.annonceur});
    if (!user) {
   res.status(400).send("pas de user"); 
    } */
    let {..._maison}=req.body;
    let urls = [];
    for (file of req.files) {
     
      urls.push("http://localhost:5000/" + file.path);
  
    }
    _maison.Photo = urls;
     
     //   _maison.annonceur=user._id
  
  
 
 
    try {
        result = await maisonService.addNewHouse(_maison);
        res.json(result);
        
    } catch (error) {
        console.log(error)
       next(); 
    }
});


// get all maisons
router.get('/', async function (req, res, next) {
  try {
      let response = await maisonService.GetHouses();
      if (response) {
          res.json(response)
      }
  } catch (error) {
      next(error)
  }
});


// Update
router.put('/update/:id', upload.any("file", 10), async function (req, res, next) {
  let maisonId = req.params.id;
  let maison = {
    ...req.body
  };
  let urls = [];
  for (file of req.files) {
    urls.push("http://localhost:5000/" + file.path);
  }
  maison.Photo = urls;
 

  try {
    let response = await maisonService.updateMaison(maisonId,maison);
    if (response) {
      res.json(response);
    }
  } catch (error) {
    next(error);
  }
});


// remove 
router.delete('/delete/:id', async function (req, res, next) {
  let maisonId = req.params.id;

  try {
    let response = await maisonService.removeMaison(maisonId);
    if (response) {
      res.json(response);
    }
  } catch (error) {
    console.log(error)
    next(error);
  }
}); 
// Get a Maison By Id
router.get('/:id',  async function (req, res, next) {
  let maisonId=req.params.id;
  try {
    let response = await maisonService.getMaisonById(maisonId);
    if (response) {
      res.json(response);
    }
  } catch (error) {
    next(error);
  }
});
// Get a Maison By Id


module.exports = router;