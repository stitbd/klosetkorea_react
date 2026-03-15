import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';
import Loader from '../components/ui/Loader/Loader';

// Lazy-loaded pages
const HomePage       = lazy(() => import('../pages/Home/HomePage'));
const ProductDetails = lazy(() => import('../pages/ProductDetails/ProductDetailsPage'));
const CartPage       = lazy(() => import('../pages/Cart/CartPage'));
const CheckoutPage   = lazy(() => import('../pages/Checkout/CheckoutPage'));
const NotFoundPage   = lazy(() => import('../pages/NotFound/NotFoundPage'));

const PageLoader = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="spinner-border text-danger" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const AppRoutes = () => (
  <>
    <Header />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/"              element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart"          element={<CartPage />} />
        <Route path="/checkout"      element={<CheckoutPage />} />
        <Route path="*"              element={<NotFoundPage />} />
      </Routes>
    </Suspense>
    <Footer />
  </>
);

export default AppRoutes;
