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
    monthsDuration: {
        type: Number,
        required: [true, 'Duration of rent is required']
    },
    contract: {
        type: String,
        required: [true, 'A contract is required']
    },
    reviewed: {
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

RentSchema.virtual("observation", {
    ref: "Observation",
    localField: "_id",
    foreignField: "rent",
    justOne: true,
});

RentSchema.virtual("bill", {
    ref: "Bill",
    localField: "_id",
    foreignField: "rent",
    justOne: true,
});

const Rent = mongoose.model('Rent', RentSchema);

module.exports = Rent;