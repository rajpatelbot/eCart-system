import { Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Homepage from "./pages/Home.page";
import Cartpage from "./pages/Cart.page";
import "./App.css";
import Checkoutpage from "./pages/Checkout.page";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<Checkoutpage />} />
        <Route path="/cart" element={<Cartpage />} />
      </Routes>
    </>
  );
}

export default App;
