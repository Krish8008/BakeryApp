import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import AddCake from "./Pages/AddCake";
import ShowCake from "./Pages/Show";
import EditCake from "./Pages/EditCake";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cakes from "./Pages/Cakes";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import BuyCake from "./Pages/cakeBooking";
import PageNotFound from "./Pages/PageNotFound";
import MyBookings from "./Pages/MyBookings";
import AdminOrders from "./Pages/AdminOrders";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-cake" element={<AddCake />} />
        <Route path="/cake/:id" element={<ShowCake/> } />
        <Route path="/cake/:id/edit" element={<EditCake />} />
        <Route path="/cake/:id/buy" element={<BuyCake />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cakes" element={<Cakes />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound/>} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        
        {/*  
        <Route path="/custom-orders" element={<CustomOrders />} />
        
        
        <Route path="/order" element={<Order />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;