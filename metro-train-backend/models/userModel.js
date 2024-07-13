const mongoose = require("mongoose");
// const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    zeroCardNumber: { type: String, required: true },
    amountAvailable: { type: String, required: true },
    journeyCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("user", userSchema);

module.exports = User;
