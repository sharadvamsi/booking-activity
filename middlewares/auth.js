import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const registerValidation = async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  if (!name) return res.status(400).json({ message: 'name is required' });
  if (!email) return res.status(400).json({ message: 'email is required' });
  if (!phone) return res.status(400).json({ message: 'phone number is required' });
  if (!password) return res.status(400).json({ message: 'password is required' });

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  next();
};

export const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: 'email is required' });
  if (!password) return res.status(400).json({ message: 'password is required' });
  next();
};


export const bookingAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  const token = authHeader.split(' ')[1];
  

  try {

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
