

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





module.exports = (Maison) => {
    return {
        addNewHouse: addNewHouse(Maison)
    }
}