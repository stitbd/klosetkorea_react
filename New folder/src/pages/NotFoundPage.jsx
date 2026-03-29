import React from "react";
import MainLayout from "../components/layout/MainLayout";

const NotFoundPage = () => (
  <MainLayout>
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-8xl font-display font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl font-semibold text-gray-800 mb-2">Page Not Found</p>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a href="/" className="btn-primary px-8 py-3 text-sm">
        Back to Home
      </a>
    </div>
  </MainLayout>
);

export default NotFoundPage;
