// src/routes/AppRoutes.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Header from '../components/layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';

const HomePage              = lazy(() => import('../pages/Home/HomePage'));
const CategoriesPage  = lazy(() => import('../pages/CategoryPage/CategoriesPage'));
const CategoriesMobilePage  = lazy(() => import('../pages/CategoryPage/CategoriesMobilePage'));
const NewArrivalsPage       = lazy(() => import('../pages/CategoryPage/NewArrivalsPage'));
const ProductDetails        = lazy(() => import('../pages/ProductDetails/ProductDetailsPage'));
const CatagoryProductPage   = lazy(() => import('../pages/CategoryPage/CatagoryProductPage'));
const SubCategories         = lazy(() => import('../components/ui/SubCategory/SubCategories'));
const CartPage              = lazy(() => import('../pages/Cart/CartPage'));
const CheckoutPage          = lazy(() => import('../pages/Checkout/CheckoutPage'));
const RegisterPage          = lazy(() => import('../pages/Account/RegisterPage'));
const ForgotPasswordPage    = lazy(() => import('../pages/Account/ForgotPasswordPage'));
const CustomerDashboardPage = lazy(() => import('../pages/Account/CustomerDashboardPage'));
const PageDetailPage        = lazy(() => import('../pages/CompanyPage/PageDetailPage'));
            
const ContactPage        = lazy(() => import('../pages/Contact/ContactPage'));
const AboutPage        = lazy(() => import('../pages/about/AboutPage'));

const SearchResultsPage        = lazy(() => import('../pages/SearchResults/SearchResultsPage'));

const GalleryFullPage = lazy(() => import('../pages/Gallery/GalleryFullPage'));

const NotFoundPage          = lazy(() => import('../pages/NotFound/NotFoundPage'));

const PageLoader = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="spinner-border" style={{ color: '#FF6503' }} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const pageTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

  return (
    <>
      <Header />
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
            transition={pageTransition}
            style={{ width: '100%' }}
          >
            <Routes location={location}>
              {/* ── Home ── */}
              <Route path="/" element={<HomePage />} />

              {/* ── Mobile: all top-level categories list ── */}
              <Route path="/category" element={<CategoriesMobilePage />} />
              <Route path="/categories" element={<CategoriesPage />} />

              {/* ── New Arrivals ── */}
              <Route path="/new-arrivals" element={<NewArrivalsPage />} />

              {/* ── Product detail ── */}
              <Route path="/product/:slug" element={<ProductDetails />} />

              <Route path="/products/:catSlug"              element={<CatagoryProductPage />} />
              <Route path="/categories/:catSlug/:subSlug"   element={<CatagoryProductPage />} />
              <Route path="/categories/:catSlug"            element={<SubCategories />} />

              {/* ── Cart & Checkout ── */}
              <Route path="/cart"      element={<CartPage />} />
              <Route path="/checkout"  element={<CheckoutPage />} />

              {/* ── Auth ── */}
              <Route path="/register"        element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/my-account"      element={<CustomerDashboardPage />} />

              {/* ── Dynamic CMS pages ── */}
              <Route path="/page/:slug" element={<PageDetailPage />} />
              
              <Route path="/contact"  element={<ContactPage />} />
              
              <Route path="/about"  element={<AboutPage />} />

              <Route path="/search" element={<SearchResultsPage />} />

              <Route path="/gallery" element={<GalleryFullPage />} />

              {/* ── 404 ── */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </>
  );
};

export default AppRoutes;