import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoaderCircle, LockKeyhole, ShieldCheck } from "lucide-react";
import { API_URL } from "../config/api";
import toast from "react-hot-toast";

const BuyCake = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cake, setCake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ quantity: 1, deliveryAddress: "", phone: "", deliveryDate: "" });
  const minDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    let active = true;
    axios.get(`${API_URL}/api/cakes/${id}`).then((res) => { if (active) setCake(res.data.cake); }).catch(() => toast.error("That cake is unavailable.")).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  const handleChange = (e) => setFormData((current) => ({ ...current, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    const quantity = Number(formData.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) return toast.error("Choose between 1 and 20 cakes.");
    if (!formData.deliveryAddress.trim()) return toast.error("Delivery address is required.");
    if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) return toast.error("Enter a valid 10-digit phone number.");
    if (!formData.deliveryDate || formData.deliveryDate < minDate) return toast.error("Choose a valid delivery date.");
    const token = localStorage.getItem("token");
    if (!token) { toast.error("Please log in to book your cake."); navigate("/login", { state: { from: `/cake/${id}/buy` } }); return; }
    if (!window.Razorpay) return toast.error("Secure payments are still loading. Please try again in a moment.");
    try {
      setSubmitting(true);
      const { data } = await axios.post(`${API_URL}/api/payment/create-order`, { cakeId: id, quantity }, { headers: { Authorization: `Bearer ${token}` } });
      const savedUser = JSON.parse(localStorage.getItem("user") || "null");
      const razorpay = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount, currency: data.order.currency, name: "CakeCraft", description: cake.name, order_id: data.order.id,
        prefill: { name: savedUser?.name || "", email: savedUser?.email || "", contact: formData.phone },
        theme: { color: "#4c2626" },
        handler: async (response) => {
          try {
            await axios.post(`${API_URL}/api/payment/verify`, { ...response, cakeId: id, quantity, deliveryAddress: formData.deliveryAddress.trim(), phone: formData.phone.trim(), deliveryDate: formData.deliveryDate }, { headers: { Authorization: `Bearer ${token}` } });
            toast.success("Your order is confirmed. We can't wait to bake it!"); navigate("/my-bookings");
          } catch (error) { toast.error(error.response?.data?.message || "We could not confirm your payment."); }
        },
        modal: { ondismiss: () => setSubmitting(false) },
      });
      razorpay.open();
    } catch (error) { toast.error(error.response?.data?.message || "We could not start your payment."); }
    finally { setSubmitting(false); }
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#fffaf7]"><LoaderCircle className="animate-spin text-[#9b4d39]" /></div>;
  if (!cake) return <div className="flex min-h-screen items-center justify-center bg-[#fffaf7] text-[#7d6259]">This cake could not be found.</div>;
  const total = cake.price * Number(formData.quantity || 0);
  return <main className="min-h-screen bg-[#fffaf7] px-5 py-10 md:py-16"><div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[.85fr_1.15fr]"><aside className="h-fit overflow-hidden rounded-3xl border border-[#eadbd1] bg-white shadow-[0_8px_24px_rgba(73,38,33,.06)]"><img src={cake.images?.[0] || "/no-image.png"} alt={cake.name} className="h-64 w-full object-cover" /><div className="p-6"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#b45d45]">{cake.category}</p><h1 className="mt-2 font-serif text-3xl font-semibold">{cake.name}</h1><p className="mt-2 text-[#7d6259]">{cake.weight} · {cake.flavor}</p><div className="mt-6 border-t border-[#f1e6df] pt-5"><p className="text-sm text-[#7d6259]">Order total</p><p className="text-3xl font-bold text-[#9b4d39]">₹{Number.isFinite(total) ? total : cake.price}</p></div></div></aside><section className="rounded-3xl border border-[#eadbd1] bg-white p-6 shadow-[0_8px_24px_rgba(73,38,33,.06)] md:p-9"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#b45d45]">Secure checkout</p><h2 className="mt-2 font-serif text-4xl font-semibold">Delivery details</h2><p className="mt-2 text-[#7d6259]">A few details and your cake will be on its way.</p><form onSubmit={handleSubmit} className="mt-8 space-y-5"><label className="block text-sm font-bold">Quantity<input type="number" name="quantity" min="1" max="20" required value={formData.quantity} onChange={handleChange} className="mt-2 w-full rounded-xl border border-[#d9c6ba] px-4 py-3 outline-none focus:border-[#9b4d39] focus:ring-2 focus:ring-[#f4e7df]" /></label><label className="block text-sm font-bold">Delivery address<textarea name="deliveryAddress" rows="3" required value={formData.deliveryAddress} onChange={handleChange} placeholder="House / street / area" className="mt-2 w-full rounded-xl border border-[#d9c6ba] px-4 py-3 outline-none focus:border-[#9b4d39] focus:ring-2 focus:ring-[#f4e7df]" /></label><div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-bold">Phone number<input type="tel" name="phone" required inputMode="numeric" maxLength="10" value={formData.phone} onChange={handleChange} placeholder="10-digit mobile" className="mt-2 w-full rounded-xl border border-[#d9c6ba] px-4 py-3 outline-none focus:border-[#9b4d39] focus:ring-2 focus:ring-[#f4e7df]" /></label><label className="block text-sm font-bold">Delivery date<input type="date" name="deliveryDate" required min={minDate} value={formData.deliveryDate} onChange={handleChange} className="mt-2 w-full rounded-xl border border-[#d9c6ba] px-4 py-3 outline-none focus:border-[#9b4d39] focus:ring-2 focus:ring-[#f4e7df]" /></label></div><button disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4c2626] py-4 font-bold text-white transition hover:bg-[#683533] disabled:cursor-not-allowed disabled:opacity-60">{submitting ? <LoaderCircle className="animate-spin" size={18} /> : <LockKeyhole size={18} />} {submitting ? "Opening secure payment…" : `Pay ₹${total}`}</button></form><p className="mt-5 flex items-center gap-2 text-sm text-[#7d6259]"><ShieldCheck size={17} className="text-[#6e8a5a]" /> Payments are securely processed by Razorpay.</p></section></div></main>;
};

export default BuyCake;
