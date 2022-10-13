const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    },
    score: {
        type: Number,
        minValue: 1,
        maxValue: 5,
        required: [true, 'Give a score from 1 to 5']
    },
    comment: {
        type: String,
        required: [true, 'Comment your review'],
        minLength: [30, 'The review comment must have at least 30 characters'] 
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

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;