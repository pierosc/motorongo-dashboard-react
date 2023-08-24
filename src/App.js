import logo from "./logo.svg";
import "./App.css";
import TripsView from "./Pages/TripsView/TripsView";

function App() {
  return (
    <div className="App">
      <div className="flex justify-center">
        <div style={{ width: "70vw" }}>
          <TripsView />
        </div>
      </div>
    </div>
  );
}

export default App;
