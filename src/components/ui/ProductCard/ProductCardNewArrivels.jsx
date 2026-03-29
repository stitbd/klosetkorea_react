import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCardNewArrivels.scss';

/**
 * ProductCardNewArrivels
 *
 * Matches the card design seen in the mobile screenshot:
 *   • Tall portrait image (3:4 aspect ratio)
 *   • Black "NEW" pill badge — top-left of image
 *   • Product name in uppercase semi-bold below image
 *   • Bold price below name
 *   • Subtle hover: image scales, card gets a soft shadow
 */
const ProductCardNewArrivels = ({ product }) => {
  const {
    id,
    slug,
    name,
    price,
    image,
    images,
    isNew = true,
  } = product;

  const imgSrc  = image || images?.[0] || '';
  const imgHover= images?.[1] || imgSrc;
  const link    = `/products/${slug || id}`;

  return (
    <Link to={link} className="product-card-new-arrival" aria-label={name}>
      {/* ── Image ─────────────────────────────────────────── */}
      <div className="product-card-new-arrival__image-wrap">
        <img
          src={imgSrc}
          alt={name}
          className="product-card-new-arrival__image product-card-new-arrival__image--main"
          loading="lazy"
        />
        {imgHover !== imgSrc && (
          <img
            src={imgHover}
            alt={name}
            className="product-card-new-arrival__image product-card-new-arrival__image--hover"
            loading="lazy"
          />
        )}

        {isNew && (
          <span className="product-card-new-arrival__badge">NEW</span>
        )}
      </div>

      {/* ── Info ──────────────────────────────────────────── */}
      <div className="product-card-new-arrival__info">
        <p className="product-card-new-arrival__name">{name}</p>
        <p className="product-card-new-arrival__price">
          Tk. {Number(price).toLocaleString('en-BD')}
        </p>
      </div>
    </Link>
  );
};

export default ProductCardNewArrivels;