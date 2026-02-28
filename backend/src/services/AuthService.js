import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class AuthService {
  static generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'your_secret_key', {
      expiresIn: process.env.JWT_EXPIRY || '7d'
    });
  }

  static async signUp(username, email, password) {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw new Error('Username or email already exists');
    }

    const user = new User({
      username,
      email,
      passwordHash: password
    });

    await user.save();
    const token = this.generateToken(user._id);

    return { user: user.toObject(), token };
  }

  static async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user._id);
    return { user: user.toObject(), token };
  }

  static async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
      const user = await User.findById(decoded.userId);
      return user;
    } catch (error) {
      return null;
    }
  }
}

export default AuthService;
