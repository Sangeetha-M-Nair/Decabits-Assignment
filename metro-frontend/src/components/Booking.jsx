import React, { useEffect, useState } from "react";
import axios from "axios";

const travelCosts = {
  Kid: 30,
  Adult: 100,
  "Senior Citizen": 20,
};

export default function Booking() {
  const [station, setStation] = useState("New Delhi");
  const [from, setFrom] = useState("New Delhi");
  const [to, setTo] = useState("Airport");
  const [discount, setDiscount] = useState("");

  const [passengerType, setPassengerType] = useState("Adult");
  const [tripType, setTripType] = useState("Single");
  const [zeroCardNumber, setZeroCardNumber] = useState("");
  const [totalPayment, setTotalPayment] = useState(0);

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    let cost = travelCosts[passengerType];
    let discountValue = 0;

    if (tripType === "Return") {
      discountValue = cost * 0.5; //discount value is calculated
      cost += cost * 0.5; // 50 % deduction on return
    }
    setDiscount(discountValue);

    setTotalPayment(cost);
  }, [passengerType, tripType]);

  async function handleSubmit(e) {
    e.preventDefault();

    //To check whether the travel destination is same
    if (from === to) {
      setErrorMessage("Please select different travel destination");
      return;
    }
    try {
      const formData = await axios.post(
        "http://localhost:5000/ticket/book-tickets",
        {
          station,
          from,
          to,
          totalPayment,
          passengerType,
          tripType,
          zeroCardNumber,
          discount,
        }
      );
      console.log(formData.data);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }
    alert("successful");
  }

  return (
    <div className="container">
      {" "}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form id="form" onSubmit={handleSubmit}>
        <div className="form-div">
          <label className="form-labels">ZeroCard Number :</label>
          <input
            className="form-input"
            type="text"
            value={zeroCardNumber}
            onChange={(e) => setZeroCardNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-div">
          <label className="form-labels">Ticket booking Station :</label>
          <select
            className="form-input"
            value={station}
            onChange={(e) => setStation(e.target.value)}
          >
            <option value="New Delhi">New Delhi</option>
            <option value="Airport">Airport</option>
          </select>
        </div>
        <div className="form-div">
          <label className="form-labels">From :</label>
          <select
            className="form-input"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="New Delhi">New Delhi</option>
            <option value="Airport">Airport</option>
          </select>
        </div>
        <div className="form-div">
          <label className="form-labels">To :</label>
          <select
            className="form-input"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="Airport">Airport</option>

            <option value="New Delhi">New Delhi</option>
          </select>
        </div>
        <div className="form-div">
          <label className="form-labels">Passenger Type:</label>
          <select
            className="form-input"
            value={passengerType}
            onChange={(e) => setPassengerType(e.target.value)}
          >
            <option value="Kid">Kid</option>
            <option value="Adult">Adult</option>
            <option value="Senior Citizen">Senior Citizen</option>
          </select>
        </div>
        <div className="form-div">
          <label className="form-labels">Trip Type:</label>
          <select
            className="form-input"
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
          >
            <option value="Single">Single</option>
            <option value="Return">Return</option>
          </select>
        </div>

        <div className="form-div">
          <label className="form-labels">Total Amount:</label>
          <input
            className="form-input"
            type="text"
            value={totalPayment}
            disabled
          />
        </div>
        <button className="form-btn" type="submit">
          Click here to book your tickets
        </button>
      </form>
    </div>
  );
}
