import mongoose from "mongoose";

const ratingSchema = mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  review: {
    type: String
  },
  rating: {
    type: Number
  }
});


const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;










