const addNewReservation = (Reservation) => async (reservation) => {
    const _reservation = new Reservation(reservation);
  
    try {
      
      const save= await _reservation.save();
  
      if (save) {
        return {
          status: "success",
          message: "reservation added succssfully!!!",
          payload: save,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: "failed",
        message: "failed!!!",
        payload: error,
      };
    }
  };
  const updateReservation = (Reservation) => async (id, reservation) => {
    if (
      id === undefined ||
    reservation === undefined ||
      JSON.stringify(reservation) === "{}"
    ) {
      return {
        status: "error",
        message: "Unable to update Reservation",
        payload: null,
      };
    }
    try {
      let updateReservation = await Reservation.findByIdAndUpdate(id, reservation);
      if (updateReservation) {
        return {
          status: "success",
          message: "reservation updated successfully",
          payload: await Reservation.findById(id),
        };
      }
    } catch (error) {
      return {
        status: "error",
        message: "Update Reservation is failed",
        payload: error,
      };
    }
  };
  const GetReservations = (Reservation) => async () => {
    try {
      let result = await Reservation.find({cofirmation:false}).populate("client").populate("house");
      if (result) {    
        return {
          status: "success",
          message: "All Reservations",
          payload: result,
        };
      }
    } catch (error) {
      console.log(error)
      return {
        status: "error",
        message: "error. unable to get all Reservations",
        payload: error,
      };
    }
  };
  
  const GetReservationsConf = (Reservation) => async () => {
    try {
      let result = await Reservation.find({cofirmation:true}).populate("client").populate("house");
      if (result) {    
        return {
          status: "success",
          message: "All Reservations",
          payload: result,
        };
      }
    } catch (error) {
      console.log(error)
      return {
        status: "error",
        message: "error. unable to get all Reservations",
        payload: error,
      };
    }
  };
  
  
      
 
      
    
  const deleteReservation = (Reservation) => async (id) => {
    if (id === undefined) {
      return {
        status: "error",
        message: `Can't delete reservation without a given id`,
        payload: null,
      };
    }
    try {
      let reservation = await Reservation.deleteOne({ _id: id });
      if (reservation) {
        return {
          status: "success",
          message: `Reservation with _id=${id} has deleted`,
          payload: reservation,
        };
      }
    } catch (error) {
      return {
        status: "error",
        message: `Error to delete reservation with _id=${id}`,
        payload: null,
      };
    }
  };
  
  
  
  
  module.exports = (Reservation) => {
    return {
      addNewReservation: addNewReservation(Reservation),
      updateReservation: updateReservation(Reservation),
      deleteReservation: deleteReservation(Reservation),
     GetReservations: GetReservations(Reservation),
     GetReservationsConf: GetReservationsConf(Reservation)


    };
  };
   