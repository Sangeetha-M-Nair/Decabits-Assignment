const router = require("express").Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
require("dotenv").config();

// const authUser = require("../middleware/authUser");
const User = require("../models/userModel");

router.get("/:zeroCardNumer", async (req, res) => {
  const cardNumer = req.params.zeroCardNumer;
  console.log("params", cardNumer);
  console.log(
    "zeroCardNumerzeroCardNumerzeroCardNumer" + req.params.zeroCardNumer
  );
  const user = await User.findOne({ cardNumer });
  console.log(user);
  res.json({
    firstName: user.firstName,
    id: user._id,
    email: user.email,
    zeroCardNumer: user.zeroCardNumer,
  });
});

module.exports = router;
