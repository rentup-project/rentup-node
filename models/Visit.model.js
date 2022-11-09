const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema(
  {
    userWhoVisits: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    },
    day: {
        type: String,
        required: true,
    },
    hour: {
        type: String,
        required: true,
    },
    reserved: {
        type: Boolean,
        default: false
    },
    duration: {
        type: String,
        default: '30 minutes'
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

const Visit = mongoose.model('Visit', VisitSchema);

module.exports = Visit;