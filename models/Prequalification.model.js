const mongoose = require("mongoose");

const PrequalificationSchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tenantsQuantity: {
      type: Number,
      required: [true, "Tenants quantity is required"],
    },
    hasPet: {
      type: String,
      enum: ["Yes", "No"],
      required: [true, "Pet information is required"],
    },
    jobDuration: {
      type: String,
      enum: ["More than 3 months", "One year", "More than a year"],
      required: [true, "Job duration is required"],
    },
    annualSalary: {
      type: Number,
      required: [true, "Annual salary is required"],
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

const Prequalification = mongoose.model("Prequalification", PrequalificationSchema);

module.exports = Prequalification;