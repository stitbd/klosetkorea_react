import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header    from "../../components/layout/Header/Header";
import Footer    from "../../components/layout/Footer/Footer";
import Container from "../../components/layout/Container/Container";
import Button    from "../../components/ui/Button/Button";
import Input     from "../../components/ui/Input/Input";
import useCart   from "../../features/cart/hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";

// ─── CheckoutPage ─────────────────────────────────────────────────────────────
const CheckoutPage = () => {
  const { items, total, emptyCart } = useCart();
  const shipping   = total >= 2000 ? 0 : 120;
  const grandTotal = total + shipping;

  const [form, setForm]       = useState({
    fullName: "", phone: "", email: "",
    address: "", city: "", district: "",
    paymentMethod: "cod",
  });
  const [placing, setPlacing] = useState(false);
  const [placed,  setPlaced]  = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPlacing(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    emptyCart();
    setPlaced(true);
    setPlacing(false);
  };

  if (placed) return <OrderSuccess />;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 py-8">
        <Container>
          <h1 className="font-display font-bold text-2xl text-gray-900 mb-6">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Shipping + Payment */}
              <div className="lg:col-span-2 space-y-5">
                {/* Shipping Info */}
                <section className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                  <h2 className="font-semibold text-gray-900 mb-4">Shipping Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Full Name *" name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Your full name" />
                    <Input label="Phone *" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="01xxxxxxxxx" />
                    <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" wrapperClassName="sm:col-span-2" />
                    <Input label="Address *" name="address" value={form.address} onChange={handleChange} required placeholder="Street address" wrapperClassName="sm:col-span-2" />
                    <Input label="City *" name="city" value={form.city} onChange={handleChange} required placeholder="City" />
                    <Input label="District *" name="district" value={form.district} onChange={handleChange} required placeholder="District" />
                  </div>
                </section>

                {/* Payment */}
                <section className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                  <h2 className="font-semibold text-gray-900 mb-4">Payment Method</h2>
                  <div className="space-y-2">
                    {[
                      { value: "cod",    label: "Cash on Delivery",  desc: "Pay when you receive your order" },
                      { value: "bkash",  label: "bKash",             desc: "Mobile financial service" },
                      { value: "nagad",  label: "Nagad",             desc: "Mobile financial service" },
                      { value: "card",   label: "Credit / Debit Card", desc: "Visa, Mastercard" },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                          form.paymentMethod === opt.value
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={opt.value}
                          checked={form.paymentMethod === opt.value}
                          onChange={handleChange}
                          className="accent-red-600"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{opt.label}</p>
                          <p className="text-xs text-gray-400">{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right: Order summary */}
              <div>
                <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm sticky top-24">
                  <h2 className="font-display font-bold text-lg text-gray-900 mb-4">Your Order</h2>

                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-4">
                    {items.map(({ product, qty }) => (
                      <div key={product.id} className="flex gap-3 items-center">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-800 line-clamp-1">{product.name}</p>
                          <p className="text-xs text-gray-400">× {qty}</p>
                        </div>
                        <span className="text-xs font-bold text-gray-900 whitespace-nowrap">
                          {formatPrice(product.price * qty)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      {shipping === 0
                        ? <span className="text-green-600 font-medium">Free</span>
                        : <span>{formatPrice(shipping)}</span>
                      }
                    </div>
                    <div className="flex justify-between font-bold text-base text-gray-900 pt-2 border-t border-gray-100">
                      <span>Total</span>
                      <span className="text-red-600">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    className="mt-5"
                    loading={placing}
                    disabled={items.length === 0}
                  >
                    Place Order
                  </Button>
                  <Link to="/cart" className="btn-ghost w-full justify-center mt-2 py-2 text-xs">
                    ← Back to Cart
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

// ─── Order Success ────────────────────────────────────────────────────────────
const OrderSuccess = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1 flex items-center justify-center py-20">
      <div className="text-center max-w-md px-4">
        <div className="text-7xl mb-6">🎉</div>
        <h1 className="font-display font-bold text-3xl text-gray-900 mb-3">Order Placed!</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Thank you for your purchase! We'll send you a confirmation shortly
          and your order will arrive within 3–5 business days.
        </p>
        <Link to="/" className="btn-primary px-10 py-3 text-sm">Continue Shopping</Link>
      </div>
    </main>
    <Footer />
  </div>
);

export default CheckoutPage;
