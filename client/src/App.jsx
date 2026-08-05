import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

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
import Profile from "./Pages/Profile";
import ChatWidget from "./chatbot/components/ChatWidget";
import AdminRoute from "./middlewares/AdminRoute";
import Practice from "./practice";



function App() {

  const [token, setToken] = useState(
    localStorage.getItem("token")
);

const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
);

  return (
    <BrowserRouter>
      <Navbar setToken={setToken} setUser={setUser}  />

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/cake/:id" element={<ShowCake/> } />
        <Route path="/cake/:id/buy" element={<BuyCake />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cakes" element={<Cakes />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login setToken={setToken} setUser={setUser}  />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="*" element={<PageNotFound/>} />
        <Route path="/practice" element={<Practice/>}  />

        <Route 
          path="/add-cake" 
            element={
              <AdminRoute>
                <AddCake />
              </AdminRoute>
            } />

        <Route 
          path="/cake/:id/edit" 
          element={
            <AdminRoute>
              <EditCake />  
            </AdminRoute>
          } />

        <Route 
          path="/admin/orders" 
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
            } />
        
        {/*  
        <Route path="/custom-orders" element={<CustomOrders />} />
        <Route path="/order" element={<Order />} /> */}
      </Routes>
       {token && <ChatWidget user={user}/>} 
    </BrowserRouter>
  );
}

export default App;