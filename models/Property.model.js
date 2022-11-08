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
      required: [true, "Property type is required"],
    },
    houseType: {
      type: String,
      enum: ["Detached house", "Single family house", "Semi-detached house"],
      required: [
        function () {
          return this.propertyType === "House";
        },
        "House type is required",
      ],
    },
    apartmentType: {
      type: String,
      enum: ["Apartment", "Penthouse", "Duplex", "Studio", "Loft"],
      required: [
        function () {
          return this.propertyType === "Apartment";
        },
        "Apartment type is required",
      ],
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
      required: [
        function () {
          return this.propertyType === "Apartment";
        },
        "Orientation is required",
      ],
    },
    furniture: {
      type: String,
      enum: ["Not furnished", "Only kitchen furnished", "Fully furnished"],
    },
    floor: {
      type: String,
      enum: ["First", "In between", "Last"],
      required: [
        function () {
          return this.propertyType === "Apartment";
        },
        "Floor is required",
      ],
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
      enum: ["More than 3 months", "One year", "More than a year"],
    },
    requiredAnnualSalary: {
      type: Number,
      required: [true, "Minimum annual salary requirement is required"],
    },
    tenantsQuantity: {
      type: Number,
      required: [true, "Tenants quantity is required"],
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
    reserved: {
      type: Boolean,
      default: false,
    },
    rented: {
      type: Boolean,
      default: false,
    },
    weeklyAvailability: {
      type: [String],
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: [true, 'Choose the days of the week that you are available to show your property.']
    },
    hourAvailability: {
      type: String,
      enum: ['Morning - from 9AM to 12PM', 'Afternoon - from 2PM to 6PM', 'Evening - from 6PM to 9PM'],
      required: [true, 'Choose the time frame you are available to show your property.']
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

PropertySchema.virtual("visit", {
  ref: "Visit",
  localField: "_id",
  foreignField: "property",
  justOne: true,
});

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;

