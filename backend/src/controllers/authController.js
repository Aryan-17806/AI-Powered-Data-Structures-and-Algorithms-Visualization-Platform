import AuthService from '../services/AuthService.js';
import User from '../models/User.js';

export const signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const { user, token } = await AuthService.signUp(username, email, password);
    res.status(201).json({ user: { _id: user._id, username: user.username, email: user.email }, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { user, token } = await AuthService.login(email, password);
    res.json({ user: { _id: user._id, username: user.username, email: user.email }, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findById(req.user._id);
    res.json({ user: { _id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};
