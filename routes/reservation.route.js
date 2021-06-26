const express = require("express");
const router = express.Router();
const Reservation = require("../db/models/reservation-schema");
const reservationService = require("../services/reservation-service")(
  Reservation
);
router.post("/reserve", async function (req, res, next) {
  let { ..._reservation } = req.body;


  try {
    result = await reservationService.addNewReservation(_reservation);
    res.json(result);
  } catch (error) {
    console.log(error);
    next();
  }
});
// PUT /update/:id
router.put("/update/:id", async function (req, res, next) {
  let reservationId = req.params.id;
  let reservation = {
    ...req.body
  };
reservation.cofirmation="true"

  try {
    let response = await reservationService.updateReservation(
      reservationId,
      reservation
    );
    if (response) {
      res.json(response);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/conf', async function (req, res, next) {
  try {
      let response = await reservationService.GetReservationsConf();
      if (response) {
          res.json(response)
      }
  } catch (error) {
      next(error)
  }
});

router.get('/', async function (req, res, next) {
  try {
      let response = await reservationService.GetReservations();
      if (response) {
          res.json(response)
      }
  } catch (error) {
      next(error)
  }
});
//DELETE /delete/:id
router.delete('/delete/:id', async function (req, res, next) {
  let id = req.params.id;
  try {
    let response = await reservationService.deleteReservation(id);
    if(response){
      res.json(response);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;