const mongoose = require("mongoose");

const PrequalificationSchema = new mongoose.Schema(
  {
    tenantsQuantity: {
      type: Number,
      required: [true, "Tenants quantity is required"],
    },
    hasPet: {
      type: Boolean,
      required: [true, "Pet information is required"],
    },
    requiredJobDuration: {
      type: String,
      enum: ["More than 3 months", "One year", "More than a year"],
    },
    requiredAnnualSalary: {
      type: Number,
      required: [true, "Minimum annual salary requirement is required"],
    },
    hasGuarantee: {
      type: String,
      enum: ["None", "1 month", "2 months"],
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

PrequalificationSchema.virtual("property", {
  ref: "Property",
  localField: "_id",
  foreignField: "owner",
  justOne: true,
});

const Prequalification = mongoose.model("Prequalification", PrequalificationSchema);

module.exports = Prequalification;