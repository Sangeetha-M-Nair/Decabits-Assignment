import React, { useEffect, useState } from "react";
import axios from "axios";

function CollectionSummary() {
  const [station, setStation] = useState("New Delhi");
  const [collectionSummary, setCollectionSummary] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/ticket/collection-summary/${station}`
        );
        setCollectionSummary(response.data);
      } catch (error) {
        console.error("Error in fectching data", error);
      }
    };
    fetchSummary();
  }, [station]);

  return (
    <div className="collection-summary-page">
      <h1>Collection Summary</h1>
      <div className="form-div-collection">
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
      <div className="summary-results">
        {collectionSummary ? (
          <div>
            <p>
              Total Amount Collected: {collectionSummary.totalAmountCollected}
            </p>
            <p>Total Discount Given: {collectionSummary.totalDiscountGiven}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button onClick={() => window.print()}>PRINT</button>
       
      </div>
    </div>
  );
}

export default CollectionSummary;
