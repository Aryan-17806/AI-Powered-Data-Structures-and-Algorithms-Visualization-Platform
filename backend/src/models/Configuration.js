import mongoose from 'mongoose';

const configurationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    animationSpeed: {
      type: Number,
      default: 1,
      min: 0.5,
      max: 3
    },
    layoutMode: {
      type: String,
      enum: ['compact', 'expanded', 'hierarchical'],
      default: 'compact'
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Configuration = mongoose.model('Configuration', configurationSchema);
export default Configuration;
