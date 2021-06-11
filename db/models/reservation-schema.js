const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ReservationSchema = new Schema({
 
    client: [{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:[true, 'user is required']
    }],
    cofirmation:{
        type:String,
        default:"false"
    },
   house: [{
    type: Schema.Types.ObjectId,
    ref:"Maison",
    required:[true, 'maison is required']

    }]
}, {
    timestamps: true
});


module.exports = mongoose.model('Reservation', ReservationSchema);