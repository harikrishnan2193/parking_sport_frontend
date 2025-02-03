import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import VehicleDetils from "./pages/VehicleDetils";
import Header from "./components/Header";
import Checkout from "./pages/Checkout";
import FindVahicle from "./pages/FindVahicle";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detils" element={<VehicleDetils />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/find" element={<FindVahicle />} />
      </Routes>
    </div>
  );
}

export default App;
