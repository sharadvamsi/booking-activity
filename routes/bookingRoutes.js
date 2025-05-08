import express from 'express';
import { bookActivity, getMyBookings } from '../controllers/bookingController.js';
import { bookingAuth } from '../middlewares/auth.js';

const router = express.Router();
 // Authorized only
router.post('/', bookingAuth, bookActivity);
router.get('/', bookingAuth, getMyBookings);

export default router;
