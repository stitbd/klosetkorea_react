import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header    from "../../components/layout/Header/Header";
import Footer    from "../../components/layout/Footer/Footer";
import Container from "../../components/layout/Container/Container";
import CartDrawer from "../../features/cart/components/CartDrawer";
import Button    from "../../components/ui/Button/Button";
import useCart   from "../../features/cart/hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";

// ─── CartPage ─────────────────────────────────────────────────────────────────
const CartPage = () => {
  const { items, total, removeFromCart, changeQty, emptyCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <CartDrawer />

      <main className="flex-1 py-8">
        <Container>
          {/* Heading */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-display font-bold text-2xl text-gray-900">
              Shopping Cart{" "}
              <span className="text-base font-sans font-normal text-gray-500">
                ({items.length} {items.length === 1 ? "item" : "items"})
              </span>
            </h1>
            {items.length > 0 && (
              <button
                onClick={emptyCart}
                className="text-xs text-gray-400 hover:text-red-500 transition underline"
              >
                Clear cart
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Items list */}
              <div className="lg:col-span-2 space-y-3">
                {items.map(({ product, qty }) => (
                  <CartRow
                    key={product.id}
                    product={product}
                    qty={qty}
                    onRemove={() => removeFromCart(product.id)}
                    onQtyChange={(q) => changeQty(product.id, q)}
                  />
                ))}
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <OrderSummary total={total} onCheckout={() => navigate("/checkout")} />
              </div>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};

// ─── CartRow ──────────────────────────────────────────────────────────────────
const CartRow = ({ product, qty, onRemove, onQtyChange }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4 shadow-sm">
    <Link to={`/products/${product.id}`}>
      <img
        src={product.image}
        alt={product.name}
        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-100 flex-shrink-0"
      />
    </Link>
    <div className="flex-1 min-w-0">
      <Link
        to={`/products/${product.id}`}
        className="text-sm font-semibold text-gray-800 hover:text-red-600 transition line-clamp-2"
      >
        {product.name}
      </Link>
      <p className="text-xs text-gray-400 mt-0.5">SKU: {product.sku}</p>
      <p className="text-sm font-bold text-red-600 mt-1">{formatPrice(product.price)}</p>

      <div className="flex items-center justify-between mt-3">
        {/* Qty control */}
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => onQtyChange(qty - 1)}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition"
            aria-label="Decrease"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-semibold">{qty}</span>
          <button
            onClick={() => onQtyChange(qty + 1)}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition"
            aria-label="Increase"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-gray-900">
            {formatPrice(product.price * qty)}
          </span>
          <button
            onClick={onRemove}
            className="text-gray-300 hover:text-red-500 transition"
            aria-label="Remove item"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─── OrderSummary ────────────────────────────────────────────────────────────
const OrderSummary = ({ total, onCheckout }) => {
  const shipping = total >= 2000 ? 0 : 120;
  const grandTotal = total + shipping;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm sticky top-24">
      <h2 className="font-display font-bold text-lg text-gray-900 mb-4">Order Summary</h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          {shipping === 0
            ? <span className="text-green-600 font-medium">Free</span>
            : <span className="font-medium text-gray-900">{formatPrice(shipping)}</span>
          }
        </div>
        {shipping > 0 && (
          <p className="text-xs text-gray-400">
            Add {formatPrice(2000 - total)} more for free shipping
          </p>
        )}
        <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-base text-gray-900">
          <span>Total</span>
          <span className="text-red-600">{formatPrice(grandTotal)}</span>
        </div>
      </div>

      {/* Promo input */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Promo code"
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-red-400"
        />
        <button className="btn-outline text-xs px-3 py-2">Apply</button>
      </div>

      <Button fullWidth size="lg" className="mt-4" onClick={onCheckout}>
        Proceed to Checkout
      </Button>
      <Link to="/" className="btn-ghost w-full justify-center mt-2 py-2 text-xs">
        Continue Shopping
      </Link>
    </div>
  );
};

// ─── EmptyCart ────────────────────────────────────────────────────────────────
const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
    <div className="text-6xl">🛒</div>
    <h2 className="font-display font-bold text-xl text-gray-800">Your cart is empty</h2>
    <p className="text-gray-500 text-sm max-w-xs">
      Looks like you haven't added anything yet. Start shopping and find something you'll love.
    </p>
    <Link to="/" className="btn-primary mt-2 px-8 py-3 text-sm">
      Shop Now
    </Link>
  </div>
);

export default CartPage;
