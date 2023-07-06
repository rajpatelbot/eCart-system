import { Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Checkoutpage from "./pages/Checkout.page";
import Homepage from "./pages/Home.page";
import Cartpage from "./pages/Cart.page";
import Wishlistpage from "./pages/Wishlist.page";
import ProductDetailsPage from "./pages/ProductDetails.page";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/wishlist" element={<Wishlistpage />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/checkout" element={<Checkoutpage />} />
      </Routes>
    </>
  );
}

export default App;
