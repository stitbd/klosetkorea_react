import React from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { formatPrice } from "../../../utils/formatPrice";

// ─── Icons ────────────────────────────────────────────────────────────────────
const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ─── CartDrawer ───────────────────────────────────────────────────────────────
const CartDrawer = () => {
  const { items, total, count, drawerOpen, removeFromCart, changeQty, closeCart } = useCart();

  return (
    <>
      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-white z-50 shadow-2xl flex flex-col
                    transform transition-transform duration-300 ease-in-out
                    ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <h2 className="font-display font-bold text-gray-900">
            Cart{" "}
            <span className="text-sm font-sans font-normal text-gray-500">
              ({count} {count === 1 ? "item" : "items"})
            </span>
          </h2>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-md hover:bg-gray-100 transition"
            aria-label="Close cart"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 pb-12">
              <div className="text-5xl">🛒</div>
              <p className="font-semibold text-gray-700">Your cart is empty</p>
              <p className="text-sm text-gray-400">Add some items to get started</p>
              <button
                onClick={closeCart}
                className="btn-primary mt-2 px-6 py-2.5 text-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map(({ product, qty }) => (
              <CartItem
                key={product.id}
                product={product}
                qty={qty}
                onRemove={() => removeFromCart(product.id)}
                onQtyChange={(q) => changeQty(product.id, q)}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Subtotal</span>
              <span className="text-base font-bold text-red-600">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-gray-400">Shipping calculated at checkout</p>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="btn-primary w-full justify-center py-3 text-sm"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/cart"
              onClick={closeCart}
              className="btn-outline w-full justify-center py-2.5 text-xs"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
};

// ─── CartItem ─────────────────────────────────────────────────────────────────
const CartItem = ({ product, qty, onRemove, onQtyChange }) => (
  <div className="flex gap-3 bg-gray-50 rounded-lg p-3">
    <img
      src={product.image}
      alt={product.name}
      className="w-16 h-16 object-cover rounded-md flex-shrink-0 border border-gray-200"
    />
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug">
        {product.name}
      </p>
      <p className="text-xs font-bold text-red-600 mt-0.5">{formatPrice(product.price)}</p>

      {/* Qty controls */}
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={() => onQtyChange(qty - 1)}
          className="w-6 h-6 rounded border border-gray-300 text-xs flex items-center justify-center
                     hover:border-red-500 hover:text-red-600 transition"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="text-xs font-semibold w-5 text-center">{qty}</span>
        <button
          onClick={() => onQtyChange(qty + 1)}
          className="w-6 h-6 rounded border border-gray-300 text-xs flex items-center justify-center
                     hover:border-red-500 hover:text-red-600 transition"
          aria-label="Increase quantity"
        >
          +
        </button>
        <button
          onClick={onRemove}
          className="ml-auto text-[11px] text-gray-400 hover:text-red-500 transition underline"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
);

export default CartDrawer;
