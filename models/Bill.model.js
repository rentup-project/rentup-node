const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema(
  {
    rent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rent'
    },
    type: {
        type: String,
        enum: ['water', 'electricity', 'gas', 'condominium fee', 'monthly rent', 'other'],
        required: [true, 'Type of bill is required']
    },
    amount: {
        type: Number,
        required: [true, 'The total amount of the bill is required']
    },
    paymentStatus: {
        type: String,
        enum: ['payed', 'pending payment'],
        required: [true, 'Payment status is required']
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required']
    },
    latePayment: {
        type: Boolean,
        default: false
    },
    file: {
        type: String,
        required: [true, 'File is required']
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

billSchema.virtual("rent", {
    ref: "Rent",
    localField: "_id",
    foreignField: "bills",
    justOne: false
});

const Bill = mongoose.model('Bill', BillSchema);

module.exports = Bill;