const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['message', 'reservation', 'bill'],
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret.__v;
            delete ret._id;
            delete ret.password;

            return ret
        }
    }
  }
);

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;