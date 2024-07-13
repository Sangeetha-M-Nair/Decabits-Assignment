import React from "react";
import Booking from "./Booking";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const Navigate = useNavigate();

  function handleNavigateToPassengerSummary(e) {
    e.preventDefault();
    Navigate("/passenger-summary");
  }

  function handleNavigateToCollectionSummary(e) {
    e.preventDefault();
    Navigate("/collection-summary");
  }

  return (
    <div className="App">
      <header className="App-header">Book Your Metro</header>
      <Booking />
      <div className="Box1">
        <button className="Box2" onClick={handleNavigateToPassengerSummary}>
          Click here for passenger summary
        </button>
        <button className="Box2" onClick={handleNavigateToCollectionSummary}>
          Click here for collection summary
        </button>
      </div>
    </div>
  );
}
