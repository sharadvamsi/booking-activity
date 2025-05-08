import Activity from '../models/Activity.js';

// Public - Get all activities
export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch activities' });
  }
};
