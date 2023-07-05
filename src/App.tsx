import { Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Checkoutpage from "./pages/ProductDetails.page";
import Homepage from "./pages/Home.page";
import Cartpage from "./pages/Cart.page";
import Wishlistpage from "./pages/Wishlist.page";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<Checkoutpage />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/wishlist" element={<Wishlistpage />} />
      </Routes>
    </>
  );
}

export default App;
