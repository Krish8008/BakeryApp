import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../CartContext";

export default function CartPage() {
  const { cart, updateQty, removeItem, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffaf7] px-5">
        <div className="max-w-2xl w-full rounded-3xl border border-[#eadbd1] bg-white p-8 text-center shadow-[0_8px_24px_rgba(73,38,33,.06)]">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1e5] text-[#9b4d39]"><ShoppingBag /></span>
          <h2 className="mt-5 font-serif text-3xl font-semibold">Your cart is waiting</h2>
          <p className="mt-3 text-[#7d6259]">Find a cake made for your next celebration.</p>
          <div className="mt-6">
            <Link to="/cakes" className="inline-flex items-center gap-2 rounded-full bg-[#4c2626] px-5 py-3 font-bold text-white">Browse cakes <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf7] py-10 px-4 md:py-16">
      <div className="max-w-4xl mx-auto rounded-3xl border border-[#eadbd1] bg-white p-5 shadow-[0_8px_24px_rgba(73,38,33,.06)] md:p-8">
        <div className="flex items-end justify-between gap-4 border-b border-[#eadbd1] pb-6"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#b45d45]">Saved for later</p><h2 className="mt-2 font-serif text-4xl font-semibold">Your selection</h2></div><Link to="/cakes" className="text-sm font-bold text-[#773d33] hover:text-[#b45d45]">Keep browsing</Link></div>

        <div className="mt-6 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-[#eadbd1] p-3 sm:p-4">
              <img src={item.image || "/no-image.png"} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="font-serif text-xl font-semibold">{item.name}</h3>
                <p className="text-sm text-[#7d6259]">₹{item.price} each</p>
                <div className="mt-2 flex items-center gap-2">
                  <button aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQty(item.id, item.qty - 1)} className="rounded-lg border border-[#d9c6ba] p-1 text-[#4c2626]"><Minus size={15} /></button><span className="w-6 text-center text-sm font-bold">{item.qty}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => updateQty(item.id, item.qty + 1)} className="rounded-lg border border-[#d9c6ba] p-1 text-[#4c2626]"><Plus size={15} /></button>
                  <button onClick={() => removeItem(item.id)} className="ml-2 inline-flex items-center gap-1 text-sm text-[#a1423a] hover:text-[#7d2828]"><Trash2 size={14} /> Remove</button>
                </div>
              </div>
              <div className="text-right self-start">
                <p className="font-bold text-[#9b4d39]">₹{item.price * item.qty}</p>
                <Link to={`/cake/${item.id}/buy`} className="mt-3 inline-block text-xs font-bold text-[#773d33] hover:text-[#b45d45]">Order now</Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[#eadbd1] pt-6">
          <div>
            <button onClick={() => { clearCart(); }} className="text-sm text-[#a1423a] hover:text-[#7d2828]">Clear cart</button>
          </div>

          <div className="text-right">
            <p className="text-sm text-[#7d6259]">Selection total</p>
            <p className="font-serif text-3xl font-bold text-[#9b4d39]">₹{total}</p>
            <div className="mt-3">
              <button onClick={() => navigate(`/cake/${cart[0].id}/buy`)} className="inline-flex items-center gap-2 rounded-full bg-[#4c2626] px-5 py-3 text-sm font-bold text-white hover:bg-[#683533]">Order first cake <ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
