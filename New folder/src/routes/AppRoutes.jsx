import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../components/ui/Loader/Loader";

// ─── Lazy-loaded pages ────────────────────────────────────────────────────────
const HomePage           = lazy(() => import("../pages/Home/HomePage"));
const ProductDetailsPage = lazy(() => import("../pages/ProductDetails/ProductDetailsPage"));
const CartPage           = lazy(() => import("../pages/Cart/CartPage"));
const CheckoutPage       = lazy(() => import("../pages/Checkout/CheckoutPage"));

// ─── AppRoutes ────────────────────────────────────────────────────────────────
// This file is responsible ONLY for route definitions.
// Providers (Redux, Router) live in app/providers.jsx.
// This component is rendered inside <RouterProvider> via app/router.jsx.
//
// NOTE: If you are using createBrowserRouter in app/router.jsx,
// this file serves as an alternative approach using <Routes> + <Route>.
// Use one or the other — not both.

const AppRoutes = () => (
  <Suspense fallback={<Loader fullScreen />}>
    <Routes>
      <Route path="/"                   element={<HomePage />} />
      <Route path="/collections/:slug"  element={<HomePage />} />
      <Route path="/products/:id"       element={<ProductDetailsPage />} />
      <Route path="/cart"               element={<CartPage />} />
      <Route path="/checkout"           element={<CheckoutPage />} />
      <Route
        path="*"
        element={
          <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="font-display font-bold text-8xl text-red-600">404</h1>
            <p className="text-gray-600 text-lg font-medium">Page not found</p>
            <a href="/" className="btn-primary px-8 py-3 text-sm">Back to Home</a>
          </div>
        }
      />
    </Routes>
  </Suspense>
);

export default AppRoutes;
