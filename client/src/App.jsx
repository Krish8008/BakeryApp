import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { App as CapacitorApp } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { Toaster } from "react-hot-toast";

import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import AddCake from "./Pages/AddCake";
import ShowCake from "./Pages/ShowNew";
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

import { CartProvider } from "./CartContext";
import CartPage from "./Pages/Cart";

function App() {

  const [token, setToken] = useState(
    localStorage.getItem("token")
);

const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      return undefined;
    }

    let isDisposed = false;
    let backButtonListener;

    const registerBackButtonListener = async () => {
      const listener = await CapacitorApp.addListener("backButton", ({ canGoBack }) => {
        if (canGoBack) {
          window.history.back();
        } else {
          CapacitorApp.exitApp();
        }
      });

      if (isDisposed) {
        await listener.remove();
        return;
      }

      backButtonListener = listener;
    };

    registerBackButtonListener();

    return () => {
      isDisposed = true;
      if (backButtonListener) {
        backButtonListener.remove();
      }
    };
  }, []);

  return (
    <CartProvider>
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
          <Route path="/cart" element={<CartPage/>} />
          <Route path="*" element={<PageNotFound/>} />
          

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
    </CartProvider>
  );
}

export default App;