import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../../../app/store';
import { formatPrice, PLACEHOLDER_IMG } from '../../../utils';
import './ProductCardNewArrivels.scss';

const ProductCardNewArrivels = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);

  if (!product) return null;

  const { slug, name, sku, price, originalPrice, image, badge, inStock } = product;

  return (
    <div className="pcard-new">
      {/* Image */}
      <Link to={`/product/${slug}`} className="pcard-new__img-link">
        {badge && <span className="pcard-new__badge">{badge}</span>}
        <img
          src={imgError ? PLACEHOLDER_IMG : (image || PLACEHOLDER_IMG)}
          alt={name}
          className="pcard-new__img"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </Link>

      {/* Body */}
      <div className="pcard-new__body">
        <Link to={`/product/${slug}`} className="pcard-new__name">
          {name}
        </Link>

        <div className="pcard-new__price-row">
          <span className="pcard-new__price-curr">{formatPrice(price)}</span>
          {originalPrice && originalPrice > price && (
            <span className="pcard-new__price-orig">{formatPrice(originalPrice)}</span>
          )}
        </div>

        {/* <div className="pcard-new__actions">
          <button
            className="pcard-new__btn pcard-new__btn--cart"
            onClick={() => addToCart(product, 1)}
            disabled={!inStock}
          >
            Add to Cart
          </button>
          <Link to={`/product/${slug}`} className="pcard-new__btn pcard-new__btn--buy">
            Buy Now
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCardNewArrivels;