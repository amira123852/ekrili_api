const addNewHouse = (Maison) => async (maison) => {
  const _maison = new Maison(maison);

  try {
    
    const save= await _maison.save();

    if (save) {
      return {
        status: "success",
        message: "Maison added succssfully!!!",
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

const GetHouses = (Maison) => async () => {
  try {
    let result = await Maison.find().populate("annonceur");
    if (result) {    
      return {
        status: "success",
        message: "All Houses",
        payload: result,
      };
    }
  } catch (error) {
    console.log(error)
    return {
      status: "error",
      message: "error. unable to get all Houses",
      payload: error,
    };
  }
};

const updateMaison = (Maison) => async (id, maison) => {
  if (
    id === undefined ||
    maison === undefined ||
    JSON.stringify(maison) === "{}"
  ) {
    return {
      status: "error",
      message: "Unable to update Maison",
      payload: null,
    };
  }
  try {
    let updatedMaison = await Maison.findByIdAndUpdate(id, maison);
    if (updatedMaison) {
      return {
        status: "success",
        message: "Maison updated successfully",
        payload: await Maison.findById(id),
      };
    }
  } catch (error) {
    return {
      status: "error",
      message: "Update Maison is failed",
      payload: error,
    };
  }
};

const removeMaison = (Maison) => async (id) => {
  if (id === undefined) {
    return {
      
      status: "error",
      message: "Unable to remove Maison",
      payload: null,
    };
  } else {
    try {
      let maison = await Maison.deleteOne({
        _id: id,
      });
      if (maison) {
        return {
          status: "success",
          message: `Maison removed successfully`,
          payload: maison,
        };
      }
    } catch (error) {
      console.log(error)
      return {
        status: "error",
        message: "Removing Maison is failed",
        payload: error,
      };
    }
  }
};

module.exports = (Maison) => {
  return {
    addNewHouse: addNewHouse(Maison),
    GetHouses: GetHouses(Maison),
    updateMaison: updateMaison(Maison),
    removeMaison: removeMaison(Maison)
  };
};
