import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/api";
import toast from "react-hot-toast";

const BuyCake = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [cake, setCake] = useState(null);

    const [formData, setFormData] = useState({
        quantity: 1,
        deliveryAddress: "",
        phone: "",
        deliveryDate: "",
    });

    useEffect(() => {
        fetchCake();
    }, []);

const fetchCake = async () => {
  try {
    //console.log("Cake ID:", id);

    const res = await axios.get(
      `${API_URL}/api/cakes/${id}`
    );

    //console.log("Response:", res.data);

    setCake(res.data.cake);

  } catch (error) {
    console.log(error);
  }
};
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
  e.preventDefault();

  if(Number(formData.quantity) < 1){
      return toast.error("Quntity must be at least 1")
  }

  if (!formData.deliveryAddress.trim()) {
    return toast.error("Delivery address is required");
  }

  // Phone
  if (!formData.phone.trim()) {
    return toast.error("Phone number is required");
  }

  // Phone validation
  if (!/^[6-9]\d{9}$/.test(formData.phone)) {
    return toast.error("Enter a valid 10-digit phone number");
  }

  // Delivery Date
  if (!formData.deliveryDate) {
    return toast.error("Please select delivery date");
  }

  const selectedDate = new Date(formData.deliveryDate);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return toast.error("Delivery date cannot be in the past");
  }


  try {
    const token = localStorage.getItem("token");
    console.log("token", token);

    const totalAmount =
      cake.price * Number(formData.quantity);

    // Create Razorpay Order
    const { data } = await axios.post(
      `${API_URL}/api/payment/create-order`,
      {
        amount: totalAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Data", data);
    console.log("Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      

      amount: data.order.amount,

      currency: data.order.currency,

      name: "Sweet Cakes",

      description: cake.name,

      order_id: data.order.id,

handler: async function (response) {
  try {
    const token = localStorage.getItem("token");

    const verify = await axios.post(
      `${API_URL}/api/payment/verify`,
      
      {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,

        cakeId: id,
        quantity: Number(formData.quantity),
        deliveryAddress: formData.deliveryAddress,
        phone: formData.phone,
        deliveryDate: formData.deliveryDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(verify.data.message);

    navigate("/my-bookings");

  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Verification Failed");
  }
},

      prefill: {
        name: JSON.parse(localStorage.getItem("user"))?.name,

        email: JSON.parse(localStorage.getItem("user"))?.email,

        contact: formData.phone,
      },

      notes: {
        cakeName: cake.name,
      },

      theme: {
        color: "#db2777",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

  } catch (error) {
    console.log(error);
    toast.error("Payment Failed");
  }
};

    if (!cake) return <h2>Loading...</h2>;

    return (

        <div className="max-w-xl mx-auto mt-10 shadow-lg p-6 rounded-lg">

            <img
                src={cake.images[0]}
                alt={cake.name}
                className="w-full h-72 object-cover rounded-lg"
            />

            <h2 className="text-3xl font-bold mt-4">
                {cake.name}
            </h2>

            <p className="text-pink-600 text-xl font-bold">
                ₹{cake.price}
            </p>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 mt-6"
            >

                <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <textarea
                    name="deliveryAddress"
                    placeholder="Delivery Address"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    className="w-full border p-3 rounded"
                />

                <h3 className="text-2xl font-bold">

                    Total :
                    ₹{cake.price * Number(formData.quantity)}

                </h3>

                <button
                    className="w-full bg-pink-600 text-white py-3 rounded"
                >
                    Confirm Booking
                </button>

            </form>

        </div>
    );
};

export default BuyCake;