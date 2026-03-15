import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge } from 'react-bootstrap';
import useCartStore from '../../../app/store';
import { formatPrice, PLACEHOLDER_IMG } from '../../../utils';
import './ProductCard.scss';

/**
 * ProductCard — reusable card matching Fimon's design.
 * Shows image, name, SKU, price, Add to Cart + Buy Now actions.
 */
const ProductCard = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);

  if (!product) return null;

  const {
    slug, name, sku, price, originalPrice, image, badge, inStock,
  } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <Card className="product-card h-100">
      <Link to={`/product/${slug}`} className="product-card__img-wrapper">
        {badge && (
          <Badge className="product-card__badge" bg="danger">{badge}</Badge>
        )}
        <Card.Img
          variant="top"
          src={imgError ? PLACEHOLDER_IMG : (image || PLACEHOLDER_IMG)}
          alt={name}
          className="product-card__img"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </Link>

      <Card.Body className="product-card__body d-flex flex-column">
        <Link to={`/product/${slug}`}>
          <p className="product-card__name">{name}</p>
        </Link>
        {sku && <p className="product-card__sku">SKU: {sku}</p>}

        <div className="product-card__price mt-auto mb-2">
          <span className="price-current">{formatPrice(price)}</span>
          {originalPrice && originalPrice > price && (
            <span className="price-original ms-2">{formatPrice(originalPrice)}</span>
          )}
        </div>

        <div className="product-card__actions d-flex gap-2">
          <button
            className="product-card__btn product-card__btn--add"
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            Add to Cart
          </button>
          <Link
            to={`/product/${slug}`}
            className="product-card__btn product-card__btn--buy"
          >
            Buy Now
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
