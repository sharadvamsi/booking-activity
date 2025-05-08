import Booking from '../models/Booking.js';
import Activity from '../models/Activity.js';

export const bookActivity = async (req, res) => {
    const { activityId } = req.body;
  
    // Check if activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
  
    // Create booking
    const booking = new Booking({
      userId: req.user._id,
      activityId
    });
  
    await booking.save();
    res.status(201).json({ message: 'Activity booked successfully' });
};

export const getMyBookings = async (req, res) => {
    try {
      // Fetch bookings for the logged-in user
      const bookings = await Booking.find({ userId: req.user._id });
  
      if (bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found' });
      }
  
      // Populate activity details for each booking
      const bookingsWithDetails = await Promise.all(bookings.map(async (booking) => {
        // Use ObjectId to find activity by activityId
        const activity = await Activity.findById(booking.activityId);
  
        // Check if the activity exists
        if (!activity) {
          return {
            bookingId: booking._id,
            activity: null,
            bookedAt: booking.bookedAt
          };
        }
  
        return {
          bookingId: booking._id,
          activity: activity,
          bookedAt: booking.bookedAt
        };
      }));
  
      res.status(200).json(bookingsWithDetails);
    } catch (err) {
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };
