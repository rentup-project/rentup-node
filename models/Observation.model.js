const mongoose = require('mongoose');

const ObservationSchema = new mongoose.Schema(
  {
    rent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rent'
    },
    comments: {
        type: String,
        required: [true, 'Comment is required']
    },
    images: {
        type: [String],
    },
    actionNeeded: {
        type: Boolean,
        default: false
    },
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

const Observation = mongoose.model('Observation', ObservationSchema);

module.exports = Observation;