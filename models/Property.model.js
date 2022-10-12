const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema(
    {
        feature: {
            type: String,
            enum: ['pool', 'air conditioning', 'lyft', 'built-in cabinets', 'parking', 'balcony', 'garden', '24-hour-security', 'gym', 'playground', 'spa',
                    'party-room', 'patio']
        }
    }
)

const PropertySchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: [true, 'Street is required']
    },
    streetNumber: {
      type: Number,
      required: [true, 'Street number number is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    neighborhood: {
        type: String,
        required: [true, 'Neighborhood is required']
    },
    zipCode: {
        type: String,
        required: [true, 'Zip code is required']
    },
    lat: {
        type: String,
        required: [true, 'Latitude is required']
    },
    long: {
        type: String,
        required: [true, 'Longitude is required']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pricePerMonth: {
        type: Number,
        required: [true, 'Price per month is required']
    },
    reservationPrice: {
        type: Number,
        required: [true, 'Reservation price is required']
    },
    reserved: {
        type: Boolean,
        default: false
    },
    buildingType: {
        type: String,
        enum: ['house', 'apartment'],
        required: ['true', 'Type is required']
    },
    orientation: {
        type: String,
        enum: ['exterior', 'interior'],
        required: ['true', 'Orientation is required']
    },
    floor: {
        type: String,
        enum: ['first', 'in between', 'last']
    },
    bathroom: {
        type: String,
        enum: ['1', '2', '3', '4 or more']
    },
    bedroom: {
        type: String,
        enum: ['studio', '1', '2', '3', '4 or more']
    },
    furniture: {
        type: String,
        enum: ['not furnished', 'only kitchen', 'fully furnished']
    },
    squaredMeters: {
        type: Number,
        required: [true, 'Squared meters are required']
    },
    features: {
        type: [ServicesSchema],
    },
    bailDeposit: {
        type: Number
    },
    requiredJobDuration: {
        type: String,
        enum: ['less than 3 months', 'less then a year', 'more than a year']
    },
    requiredAnnualSalary: {
        type: String,
        enum: ['<20K', '<30K', '<40K', '<50K', '<60K', '<70K', '>70K']
    },
    petAllowed: {
        type: Boolean,
        default: true,
    },
    heating: {
        type: String,
        enum: ['individual-electric', 'central', 'individual-gas']
    },
    images: {
        type: Array,
        required: [true, 'Upload at least three images'],
        minItems: 3
    },
    video: {
        type: String,
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

propertySchema.virtual("favorite", {
    ref: "Favorite",
    localField: "_id",
    foreignField: "property",
    justOne: true,
});

propertySchema.virtual("rent", {
    ref: "Rent",
    localField: "_id",
    foreignField: "property",
    justOne: true,
});

propertySchema.virtual("reservation", {
    ref: "Reservation",
    localField: "_id",
    foreignField: "property",
    justOne: true,
});

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;