import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  activityId: {
    type: String,
    required: true
  },
  bookedAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
