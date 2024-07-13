const router = require("express").Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
require("dotenv").config();

// const authUser = require("../middleware/authUser");
const TicketBooking = require("../models/ticketBookingModel");
const User = require("../models/userModel");

router.post("/book-tickets", async (req, res, next) => {
  try {
    let {
      zeroCardNumber,
      tripType,
      from,
      to,
      passengerType,
      station,
      totalPayment,
      discount,
    } = req.body;

    if (
      !zeroCardNumber ||
      !tripType ||
      !from ||
      !to ||
      !passengerType ||
      !station
    ) {
      return res.status(400).json({
        errorMessage: "please enter all required field",
      });
    }

    const cardExp = /^[0-9]+$/;
    if (!cardExp.test(zeroCardNumber))
      return res.status(400).json({
        errorMessage: "please enter numbers only",
      });

    const existingUser = await User.findOne({ zeroCardNumber: zeroCardNumber });
    console.log("existingUser", existingUser);
    const cardAmount = existingUser.amountAvailable;
    //To check if the card has required balance.
    if (cardAmount < totalPayment) {
      return res.status(400).json({
        errorMessage: `Your card amount is ${cardAmount}.Please recharge your card!`,
      });
    }
    if (!existingUser)
      return res.status(400).json({
        errorMessage: "This is not a valid card number",
      });
    existingUser.journeyCount += 1;
    await existingUser.save();
    const name = existingUser.firstName;
    const newBooking = new TicketBooking({
      zeroCardNumber,
      tripType,
      passengerType,
      station,
      from,
      to,
      totalPayment,
      name,
      discount,
    });

    const savedBooking = await newBooking.save();

    //Deducting the amount from the user account card.
    const amountAvailable = cardAmount - totalPayment;
    try {
      await User.findOneAndUpdate(
        { zeroCardNumber: zeroCardNumber },
        { amountAvailable: amountAvailable }
      );
    } catch (err) {
      console.log(err);
    }

    res.send();
  } catch (err) {
    console.log(err);

    res.status(500).send();
  }
});

router.get("/collection-summary/:station", async (req, res, next) => {
  try {
    const stationName = req.params.station;
    console.log(stationName);
    const stationSummary = await TicketBooking.aggregate([
      {
        $match: { station: stationName },
      },
      {
        $group: {
          _id: "$station",
          totalAmountCollected: { $sum: { $toDouble: "$totalPayment" } },
          totalDiscountGiven: { $sum: "$discount" },
        },
      },
    ]);
    if (stationSummary.length === 0) {
      return res
        .status(404)
        .json({ errorMessage: "No records found for this station." });
    }

    res.send(stationSummary[0]);
  } catch (err) {
    console.log(err);

    res.status(500).send();
  }
});

router.get(
  "/passenger-summary/:station/:passengerType",
  async (req, res, next) => {
    try {
      const stationName = req.params.station;
      console.log(stationName);
      const passengerType = req.params.passengerType;
      console.log(passengerType);
      const passengerSummary = await TicketBooking.aggregate([
        { $match: { station: stationName } },
        {
          $group: {
            _id: "$passengerType",
            passengerCount: { $sum: 1 },
          },
        },
        {
          $sort: {
            passengerCount: -1,
            _id: 1,
          },
        },
      ]);
      console.log(passengerSummary);
      res.send(passengerSummary);
    } catch (err) {
      console.log(err);

      res.status(500).send();
    }
  }
);
module.exports = router;
