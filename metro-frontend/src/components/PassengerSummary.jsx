import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PassengerSummary() {
  const [station, setStation] = useState("New Delhi");
  const [passengerType, setPassengerType] = useState("Adult");
  const [passengerSummary, setPassengerSummary] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/ticket/passenger-summary/${station}/${passengerType}`
        );
        setPassengerSummary(response.data);
      } catch (error) {
        console.error("Error fetching passenger summary:", error);
      }
    };
    fetchSummary();
  }, [station, passengerType]);

  return (
    <div className="passenger-summary-page">
      {" "}
      <h1>PassengerSummary</h1>
      <div className="form-div-passenger">
        <label className="form-labels">Ticket booking Station :</label>
        <select
          className="form-input"
          value={station}
          onChange={(e) => setStation(e.target.value)}
        >
          <option value="New Delhi">New Delhi</option>
          <option value="Airport">Airport</option>
        </select>
        <label className="form-labels">Passenger Type :</label>
        <select
          className="form-input"
          value={passengerType}
          onChange={(e) => setPassengerType(e.target.value)}
        >
          <option value="Adult">Adult</option>
          <option value="Kid">Kid</option>
          <option value="Senior Citizen">Senior Citizen</option>
        </select>
      </div>
      <br />
      <div className="summary-results">
        <ul>
          {passengerSummary.map((item) => (
            <li key={item._id}>
              {item._id}: {item.passengerCount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
