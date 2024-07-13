const mongoose = require("mongoose");
// const ObjectId = mongoose.Schema.Types.ObjectId;

const ticketBookingSchema = new mongoose.Schema(
  {
    zeroCardNumber: { type: String, required: true },
    station: { type: String, required: true },
    name: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    passengerType: { type: String, required: true },
    tripType: { type: String, required: true },
    totalPayment: { type: String, required: true },
    discount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
const TicketBooking = mongoose.model("ticketBooking", ticketBookingSchema);

module.exports = TicketBooking;
