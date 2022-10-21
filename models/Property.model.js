const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    lat: {
      type: String,
      required: [true, "Latitude is required"],
    },
    long: {
      type: String,
      required: [true, "Longitude is required"],
    },
    addressVisibility: {
      type: String,
      enum: ["Show full address", "Show street only"],
      required: [true, "Address visibility is required"],
    },
    availabilityDate: {
      type: Date,
      required: [true, "Availability date is required"],
    },
    propertyType: {
      type: String,
      enum: ["House", "Apartment"],
      required: [true, "Type is required"],
    },
    houseType: {
      type: String,
      enum: ["Detached house", "Single family house", "Semi-detached house"],
      required: [true, "Type is required"],
    },
    apartmentType: {
      type: String,
      enum: ["Apartment", "Penthouse", "Duplex", "Studio", "Loft"],
      required: [true, "Type is required"],
    },
    squaredMeters: {
      type: Number,
      required: [true, "Squared meters are required"],
    },
    bedroom: {
      type: Number,
      required: [true, "Number of bedrooms is required"],
    },
    bathroom: {
      type: Number,
      required: [true, "Number of bathrooms is required"],
    },
    orientation: {
      type: String,
      enum: ["Exterior", "Interior"],
      required: [true, "Orientation is required"],
    },
    furniture: {
      type: String,
      enum: ["Not furnished", "Only kitchen furnished", "Fully furnished"],
    },
    floor: {
      type: String,
      enum: ["First", "In between", "Last"],
      required: [true, "Floor is required"],
    },
    features: {
      type: [String],
      enum: [
        "Pool",
        "Air conditioning",
        "Lyft",
        "Built-in cabinets",
        "Boxroom",
        "Parking",
        "Balcony",
        "Terrace",
        "Garden",
        "24-hour-security",
        "Gym",
        "Playground",
        "Spa",
        "Patio",
      ],
    },
    requiredJobDuration: {
      type: String,
      enum: ["Less than 3 months", "Less then a year", "More than a year"],
    },
    requiredAnnualSalary: {
      type: Number,
      required: [true, "Minimum annual salary requirement is required"],
    },
    petAllowed: {
      type: Boolean,
      default: true,
    },
    heating: {
      type: String,
      enum: ["Individual-electric", "Central", "Individual-gas"],
    },
    images: {
      type: Array,
      required: [true, "Upload at least five images"],
      minItems: 5,
    },
    monthlyRent: {
      type: Number,
      required: [true, "Price per month is required"],
    },
    bailDeposit: {
      type: Number,
    },
    reservationPrice: {
      type: Number,
      required: [true, "Reservation price is required"],
    },
    requireGuarantee: {
      type: String,
      enum: ["None", "1 month", "2 months"],
    },
    reserved: {
      type: Boolean,
      default: false,
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

        return ret;
      },
    },
  }
);

PropertySchema.virtual("favorite", {
    ref: "Favorite",
    localField: "_id",
    foreignField: "property",
    justOne: true,
});

PropertySchema.virtual("rent", {
    ref: "Rent",
    localField: "_id",
    foreignField: "property",
    justOne: true,
});

PropertySchema.virtual("reservation", {
    ref: "Reservation",
    localField: "_id",
    foreignField: "property",
    justOne: true,
});

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;