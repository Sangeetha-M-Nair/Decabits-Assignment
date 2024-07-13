import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PassengerSummary from "./components/PassengerSummary";
import CollectionSummary from "./components/CollectionSummary";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/passenger-summary" element={<PassengerSummary />} />
      <Route path="/collection-summary" element={<CollectionSummary />} />
    </Routes>
  );
}

export default App;
