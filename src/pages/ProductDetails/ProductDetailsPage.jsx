import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { productService } from '../../features/products/services/productService';
import useCartStore from '../../app/store';
import { formatPrice, PLACEHOLDER_IMG } from '../../utils';
import './ProductDetailsPage.scss';

const ProductDetailsPage = () => {
  const { slug }            = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty]         = useState(1);
  const [imgErr, setImgErr]   = useState(false);
  const addToCart             = useCartStore((s) => s.addToCart);

  useEffect(() => {
    setLoading(true);
    productService.getProductBySlug(slug)
      .then((res) => setProduct(res?.data ?? res))
      .catch(() => setProduct({
        id: slug, name: slug.replace(/-/g, ' '), slug,
        price: 1290, originalPrice: 1890,
        image: PLACEHOLDER_IMG, sku: 'MU-00100',
        description: 'Premium quality product from Fimon Bangladesh.',
        inStock: true, badge: 'New',
      }))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <Container className="py-5 text-center">
      <div className="spinner-border text-danger" />
    </Container>
  );

  if (!product) return (
    <Container className="py-5 text-center">
      <h4>Product not found.</h4>
      <Link to="/" className="btn btn-danger mt-3">Back to Home</Link>
    </Container>
  );

  return (
    <main className="product-details-page">
      <Container fluid="xl" className="py-4">
        {/* Breadcrumb */}
        <nav className="mb-3" aria-label="breadcrumb">
          <ol className="breadcrumb product-details-page__breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active">{product.name}</li>
          </ol>
        </nav>

        <Row className="g-4">
          {/* Image */}
          <Col xs={12} md={5} lg={5}>
            <div className="product-details-page__img-wrap">
              {product.badge && <Badge bg="danger" className="product-details-page__badge">{product.badge}</Badge>}
              <img
                src={imgErr ? PLACEHOLDER_IMG : (product.image || PLACEHOLDER_IMG)}
                alt={product.name}
                onError={() => setImgErr(true)}
                className="product-details-page__img"
              />
            </div>
          </Col>

          {/* Info */}
          <Col xs={12} md={7} lg={7}>
            <div className="product-details-page__info">
              <h1 className="product-details-page__name">{product.name}</h1>
              {product.sku && <p className="product-details-page__sku">SKU: {product.sku}</p>}

              <div className="product-details-page__price-row">
                <span className="price-current fs-4">{formatPrice(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="price-original ms-2 fs-6">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              {product.description && (
                <p className="product-details-page__desc">{product.description}</p>
              )}

              {/* Quantity */}
              <div className="product-details-page__qty-row">
                <label className="form-label fw-600 me-3">Quantity</label>
                <div className="product-details-page__qty-ctrl">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty <= 1}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)}>+</button>
                </div>
              </div>

              <div className="product-details-page__actions">
                <button
                  className="product-details-page__btn product-details-page__btn--cart"
                  onClick={() => addToCart(product, qty)}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <Link to="/checkout" className="product-details-page__btn product-details-page__btn--buy">
                  Buy Now
                </Link>
              </div>

              <div className="product-details-page__meta mt-3">
                <p>✅ Genuine & Authentic Product</p>
                <p>🚚 Free Delivery on orders over ৳1,000</p>
                <p>🔄 7-Day Easy Return Policy</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ProductDetailsPage;
