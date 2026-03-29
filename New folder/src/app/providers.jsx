import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store  from "./store";
import router from "./router";

/**
 * Providers
 * ─────────
 * All global providers live here.
 * Add more (e.g. ThemeProvider, ToastProvider, QueryClientProvider) in this file only.
 * App.jsx stays clean and never imports providers directly.
 */
const Providers = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

export default Providers;
