import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header    from "../../components/layout/Header/Header";
import Footer    from "../../components/layout/Footer/Footer";
import Container from "../../components/layout/Container/Container";
import CartDrawer from "../../features/cart/components/CartDrawer";
import Button    from "../../components/ui/Button/Button";
import { ProductGrid } from "../../features/products";
import { SkeletonBox, SkeletonText } from "../../components/ui/Loader/Loader";
import { productApi }  from "../../features/products/services/productApi";
import { formatPrice, calcDiscount } from "../../utils/formatPrice";
import useCart from "../../features/cart/hooks/useCart";

// ─── ProductDetailsPage ───────────────────────────────────────────────────────
const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart, openCart } = useCart();

  const [product,  setProduct]  = useState(null);
  const [related,  setRelated]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [qty,      setQty]      = useState(1);
  const [adding,   setAdding]   = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    productApi.getProduct(id).then((p) => {
      if (cancelled) return;
      setProduct(p);
      setLoading(false);
      // Fetch related (same category)
      if (p?.category) {
        productApi.getSectionProducts("latest").then((items) => {
          if (!cancelled) setRelated(items.slice(0, 4));
        });
      }
    });
    return () => { cancelled = true; };
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    for (let i = 0; i < qty; i++) addToCart(product);
    openCart();
    await new Promise((r) => setTimeout(r, 700));
    setAdding(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CartDrawer />

      <main className="flex-1">
        <Container>
          {/* Breadcrumb */}
          <nav className="py-3 text-xs text-gray-400 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-red-600 transition">Home</Link>
            <span>/</span>
            <Link to="/collections/all" className="hover:text-red-600 transition">Products</Link>
            <span>/</span>
            <span className="text-gray-700 truncate max-w-[200px]">
              {loading ? "Loading…" : product?.name}
            </span>
          </nav>

          {loading ? (
            <ProductDetailSkeleton />
          ) : product ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-10">
              {/* Images */}
              <div className="space-y-3">
                <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                  <img
                    src={product.images?.[activeImg] ?? product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.images?.length > 1 && (
                  <div className="flex gap-2">
                    {product.images.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                          i === activeImg ? "border-red-500" : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col gap-4">
                {product.badge && (
                  <span className="inline-block text-xs font-bold bg-red-100 text-red-600 px-2.5 py-1 rounded-full w-fit">
                    {product.badge}
                  </span>
                )}
                <h1 className="font-display font-bold text-2xl lg:text-3xl text-gray-900 leading-snug">
                  {product.name}
                </h1>
                <p className="text-xs text-gray-400">SKU: {product.sku}</p>

                {/* Price */}
                <div className="flex items-center gap-3 py-2 border-y border-gray-100">
                  <span className="text-2xl font-bold text-red-600">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-base text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                      <span className="text-xs font-bold bg-orange-100 text-orange-600 px-2 py-0.5 rounded">
                        -{calcDiscount(product.originalPrice, product.price)}% OFF
                      </span>
                    </>
                  )}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

                {/* Qty + Add */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition text-lg"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition text-lg"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    loading={adding}
                    disabled={!product.inStock}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    disabled={!product.inStock}
                    onClick={() => { addToCart(product); }}
                  >
                    Buy Now
                  </Button>
                </div>

                {/* Meta */}
                <div className="mt-2 space-y-1.5 text-xs text-gray-500">
                  <p><span className="font-medium text-gray-700">Category:</span> {product.category}</p>
                  <p><span className="font-medium text-gray-700">Availability:</span>{" "}
                    <span className={product.inStock ? "text-green-600" : "text-red-500"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">Product not found.</p>
              <Link to="/" className="btn-primary px-6 py-2.5">Back to Home</Link>
            </div>
          )}

          {/* Related Products */}
          {related.length > 0 && (
            <div className="pb-12">
              <h2 className="section-title mb-5">You May Also Like</h2>
              <ProductGrid products={related} cols={{ mobile: 2, sm: 2, md: 4, lg: 4 }} />
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const ProductDetailSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-10">
    <SkeletonBox className="aspect-square rounded-xl" />
    <div className="space-y-4">
      <SkeletonBox className="h-5 w-20 rounded-full" />
      <SkeletonText lines={2} />
      <SkeletonBox className="h-3 w-24 rounded" />
      <SkeletonBox className="h-8 w-40 rounded" />
      <SkeletonText lines={3} />
      <div className="flex gap-3">
        <SkeletonBox className="h-11 w-32 rounded-lg" />
        <SkeletonBox className="h-11 flex-1 rounded-lg" />
        <SkeletonBox className="h-11 flex-1 rounded-lg" />
      </div>
    </div>
  </div>
);

export default ProductDetailsPage;
