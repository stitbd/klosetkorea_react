// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import AppRoutes from './routes/AppRoutes';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/layout/ScrollToTop/ScrollToTop';

const App = () => {
  const reduceMotion = useReducedMotion();

  return (
    <BrowserRouter>
      <motion.div
        className="app-shell"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ minHeight: '100%' }}
      >
        <ScrollToTop
          smooth={true}
          delay={100}
          onScrollComplete={() => {}}
        />
        <AppRoutes />
        <WhatsAppButton />
      </motion.div>
    </BrowserRouter>
  );
};

export default App;