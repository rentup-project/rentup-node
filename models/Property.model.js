const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema(
  {
    /*     street: {
      type: String,
      required: [true, "Street is required"],
    },
    streetNumber: {
      type: Number,
      required: [true, "Street number number is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    neighborhood: {
      type: String,
      required: [true, "Neighborhood is required"],
    },
    zipCode: {
      type: String,
      required: [true, "Zip code is required"],
    }, */
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
      required: [true, "Address is required"]
    },
    lat: {
      type: String,
      required: [true, "Latitude is required"]
    },
    long: {
      type: String,
      required: [true, "Longitude is required"]
    },
    addressVisibility: {
      type: String,
      enum: ["show full address", "show street only"],
      required: [true, "Address visibility is required"]
    },
    availabilityDate: {
      type: Date,
      required: [true, "Availability date is required"]
    },
    propertyType: {
      type: String,
      enum: ["house", "apartment"],
      required: [true, "Type is required"]
    },
    houseType: {
      type: String,
      enum: ["detached house", "single family house", "semi-detached house"],
      required: [true, "Type is required"]
    },
    apartmentType: {
      type: String,
      enum: ["apartment", "penthouse", "duplex", "studio", "loft"],
      required: [true, "Type is required"]
    },
    squaredMeters: {
      type: Number,
      required: [true, "Squared meters are required"]
    },
    bedroom: {
      type: String,
      enum: ["studio", "1", "2", "3", "4 or more"]
    },
    bathroom: {
      type: String,
      enum: ["1", "2", "3", "4 or more"]
    },
    orientation: {
      type: String,
      enum: ["exterior", "interior"],
      required: [true, "Orientation is required"]
    },
    furniture: {
      type: String,
      enum: ["not furnished", "only kitchen", "fully furnished"]
    },
    floor: {
      type: String,
      enum: ["first", "in between", "last"],
      required: [true, "Floor is required"]
    },
    features: {
      type: String,
      enum: [
        "pool",
        "air conditioning",
        "lyft",
        "built-in cabinets",
        "boxroom",
        "parking",
        "balcony",
        "terrace",
        "garden",
        "24-hour-security",
        "gym",
        "playground",
        "spa",
        "patio",
      ],
    },
    requiredJobDuration: {
      type: String,
      enum: ["less than 3 months", "less then a year", "more than a year"],
    },
    requiredAnnualSalary: {
      type: String,
      enum: ["<20K", "<30K", "<40K", "<50K", "<60K", "<70K", ">70K"],
    },
    petAllowed: {
      type: Boolean,
      default: true,
    },
    heating: {
      type: String,
      enum: ["individual-electric", "central", "individual-gas"],
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