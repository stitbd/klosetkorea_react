import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';

const HomePage            = lazy(() => import('../pages/Home/HomePage'));
const ProductDetails      = lazy(() => import('../pages/ProductDetails/ProductDetailsPage'));
const CatagoryProductPage = lazy(() => import('../pages/CategoryPage/CatagoryProductPage'));
const CartPage            = lazy(() => import('../pages/Cart/CartPage'));
const CheckoutPage        = lazy(() => import('../pages/Checkout/CheckoutPage'));
const NotFoundPage        = lazy(() => import('../pages/NotFound/NotFoundPage'));

const PageLoader = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="spinner-border" style={{ color: '#FF6503' }} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const AppRoutes = () => (
  <>
    <Header />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Home */}
        <Route path="/"                      element={<HomePage />} />

        {/* Product detail */}
        <Route path="/product/:slug"         element={<ProductDetails />} />

        {/* ── Category page — all nav/sub/child menus ── */}
        {/* Pattern: /categories/:slug  e.g. /categories/panjabi */}
        <Route path="/categories/:slug"      element={<CatagoryProductPage />} />

        {/* Legacy / alternative patterns still supported */}
        <Route path="/category/:slug"        element={<CatagoryProductPage />} />
        <Route path="/product-list/:id"      element={<CatagoryProductPage />} />
        <Route path="/products/:id"          element={<CatagoryProductPage />} />
        <Route path="/products"              element={<CatagoryProductPage />} />

        {/* Cart & Checkout */}
        <Route path="/cart"                  element={<CartPage />} />
        <Route path="/checkout"              element={<CheckoutPage />} />

        {/* 404 */}
        <Route path="*"                      element={<NotFoundPage />} />
      </Routes>
    </Suspense>
    <Footer />
  </>
);

export default AppRoutes;