import React from "react";
import { useCartStore, useUIStore } from "../../context/store";
import { formatCurrency } from "../../utils/format";

const CartDrawer = () => {
  const { cartDrawerOpen, closeCartDrawer } = useUIStore();
  const { items, removeItem, updateQty, totalPrice } = useCartStore();
  const total = items.reduce((acc, i) => acc + i.product.price * i.qty, 0);

  return (
    <>
      {/* Backdrop */}
      {cartDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeCartDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          cartDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-gray-900">
            Cart{" "}
            <span className="text-sm font-normal text-gray-500">
              ({items.length} items)
            </span>
          </h2>
          <button
            onClick={closeCartDrawer}
            className="p-1.5 rounded hover:bg-gray-100 transition"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-4xl mb-3">🛒</div>
              <p className="text-sm font-medium">Your cart is empty</p>
              <button
                onClick={closeCartDrawer}
                className="mt-4 btn-primary text-xs px-5 py-2"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map(({ product, qty }) => (
              <div key={product.id} className="flex gap-3 bg-gray-50 rounded-lg p-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 line-clamp-2">
                    {product.name}
                  </p>
                  <p className="text-xs text-red-600 font-bold mt-1">
                    {formatCurrency(product.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(product.id, qty - 1)}
                      className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-xs hover:border-red-500 hover:text-red-500 transition"
                    >
                      −
                    </button>
                    <span className="text-xs font-medium w-5 text-center">{qty}</span>
                    <button
                      onClick={() => updateQty(product.id, qty + 1)}
                      className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-xs hover:border-red-500 hover:text-red-500 transition"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="ml-auto text-gray-400 hover:text-red-500 transition text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex items-center justify-between text-sm font-bold text-gray-900">
              <span>Total</span>
              <span className="text-red-600">{formatCurrency(total)}</span>
            </div>
            <a
              href="/checkout"
              className="btn-primary w-full justify-center py-3 text-sm"
            >
              Proceed to Checkout
            </a>
            <a
              href="/cart"
              className="btn-outline w-full justify-center py-2.5 text-xs"
            >
              View Full Cart
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
