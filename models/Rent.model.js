const mongoose = require('mongoose');

const RentSchema = new mongoose.Schema(
  {
    userWhoRents: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    },
    pricePerMonth: {
        type: Number,
        required: [true, 'Price of rent per month is required']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date of rent is required']
    },
    duration: {
        type: String,
        required: [true, 'Duration of rent is required']
    },
    renewContract: {
        type: Boolean,
        default: false
    },
    contract: {
        type: String,
        required: [true, 'A contract is required']
    },
    bills: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Bill'
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

propertySchema.virtual("observation", {
    ref: "Observation",
    localField: "_id",
    foreignField: "rent",
    justOne: true,
});

const Rent = mongoose.model('Rent', RentSchema);

module.exports = Rent;