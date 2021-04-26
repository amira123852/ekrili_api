

const addNewHouse = Maison => async (maison) => {

    const _maison = new Maison(maison);
    try {
        const save = await _maison.save();
        if (save) {
            return ({
                status: "success",
                message: "Maison added succssfully!!!",
                payload: save
            })
        }
    } catch (error) {
        return ({
            status: "failed",
            message: "User failed to register!!!",
            payload: error
        })
    }

}

const getAllHouses = Maison => async ()=>{
   try {
     let result = await Maison.find().populate('annoceur');
     if(result){
        return ({
            status: "success",
            message: "All Houses",
            payload: result
        })
     }
   } catch (error) {
    return ({
        status: "error",
        message: "error. unable to get all Houses",
        payload: error
    })
       
   }
   

}





module.exports = (Maison) => {
    return {
        addNewHouse: addNewHouse(Maison),
        getAllHouses:getAllHouses(Maison)
    }
}