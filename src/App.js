import logo from "./logo.svg";
import "./App.css";
import TripsView from "./Pages/TripsView/TripsView";

function App() {
  return (
    <div className="App">
      <div className="flex justify-center">
        <div style={{ width: "900px", maxWidth: "90vw" }}>
          <TripsView />
        </div>
      </div>
      v: 1.0.3
    </div>
  );
}

export default App;
