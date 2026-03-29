import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";

const MainLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <CartDrawer />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default MainLayout;
