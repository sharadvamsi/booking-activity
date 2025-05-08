import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
import { loginValidation, registerValidation } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register',registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);

export default router;
