import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
      },
      pickupDate: {
        type: Date,
      },
      dropoffDate: {
        type: Date
      },
      pickupPoint: {
        type:String
      },
      dropoffPoint: {
        type:String
      },
      totalAmount: {
        type: Number
      },
      advanceAmount: {
        type: Number
      },
      pickupTime: {
        type: String
      }
})


const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
