import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "../components/ui/Loader/Loader";

// ─── Lazy pages ───────────────────────────────────────────────────────────────
const HomePage           = lazy(() => import("../pages/Home/HomePage"));
const ProductDetailsPage = lazy(() => import("../pages/ProductDetails/ProductDetailsPage"));
const CartPage           = lazy(() => import("../pages/Cart/CartPage"));
const CheckoutPage       = lazy(() => import("../pages/Checkout/CheckoutPage"));

const withSuspense = (Component) => (
  <Suspense fallback={<Loader fullScreen />}>
    <Component />
  </Suspense>
);

// ─── Route Config ─────────────────────────────────────────────────────────────
const router = createBrowserRouter([
  { path: "/",                    element: withSuspense(HomePage) },
  { path: "/collections/:slug",   element: withSuspense(HomePage) },
  { path: "/products/:id",        element: withSuspense(ProductDetailsPage) },
  { path: "/cart",                element: withSuspense(CartPage) },
  { path: "/checkout",            element: withSuspense(CheckoutPage) },
  {
    path: "*",
    element: (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-6xl font-display font-bold text-red-600">404</h1>
        <p className="mt-3 text-gray-600 text-lg">Page not found</p>
        <a href="/" className="btn-primary mt-6 px-8 py-3 text-sm">Back to Home</a>
      </div>
    ),
  },
]);

export default router;
