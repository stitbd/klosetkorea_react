// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { formatPrice, PLACEHOLDER_IMG, BASE_IMAGE_URL } from '../../../utils';
// import apiClient from '../../../services/apiClient';
// import { prefetchProduct, getPrefetchedProduct } from '../../../utils/productPrefetchCache';
// import './ProductCardNewArrivels.scss';

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// const buildImageUrl = (rawImage) => {
//   if (!rawImage) return PLACEHOLDER_IMG;
//   if (/^https?:\/\//i.test(rawImage)) return rawImage;
//   const base = (BASE_IMAGE_URL || '').replace(/\/+$/, '');
//   const path = rawImage.replace(/^\/+/, '');
//   return `${base}/${path}`;
// };

// const resolveRawImage = (imageField) => {
//   if (!imageField) return '';
//   if (typeof imageField === 'string') return imageField;
//   if (typeof imageField === 'object') return imageField.image ?? '';
//   return '';
// };

// // Extract image URL from any product shape:
// //   • product.image  → string or { image: "..." }  (category/detail API)
// //   • product.images → [{ image: "..." }, ...]      (some API variants)
// //   • null / missing                                 (search API — no image field at all)
// const extractImageFromProduct = (product) => {
//   // 1. images[] array
//   if (Array.isArray(product.images) && product.images.length > 0) {
//     const raw = product.images[0]?.image;
//     if (raw) return buildImageUrl(raw);
//   }
//   // 2. flat image field
//   const raw = resolveRawImage(product.image);
//   if (raw) return buildImageUrl(raw);

//   return ''; // no image available from this product object
// };

// // Extract image from a prefetch cache body (GET /product/:slug response)
// const extractImageFromCacheBody = (body) => {
//   if (!body?.success) return '';
//   const pd = body.product_details;
//   if (!pd) return '';

//   // product_details.images[]
//   if (Array.isArray(pd.images) && pd.images.length > 0) {
//     const raw = pd.images[0]?.image;
//     if (raw) return buildImageUrl(raw);
//   }
//   // product_details.image
//   const raw = resolveRawImage(pd.image);
//   if (raw) return buildImageUrl(raw);

//   return '';
// };


// const ProductCardNewArrivels = ({ product }) => {
//   const {
//     id,
//     slug,
//     name,
//     price,
//     image,
//     images,
//     isNew = true,
//     pre_order_status,   // ← add this
//   } = product;

//   const imgSrc  = image || images?.[0] || '';
//   const imgHover= images?.[1] || imgSrc;
//   const link    = `/products/${slug || id}`;
  
//   const [isStockOut, setIsStockOut] = useState(false);

//   return (
//     <Link to={link} className="product-card-new-arrival" aria-label={name}>
//       {/* ── Image ─────────────────────────────────────────── */}
//       <div className="product-card-new-arrival__image-wrap">
//         <img
//           src={imgSrc}
//           alt={name}
//           className="product-card-new-arrival__image product-card-new-arrival__image--main"
//           loading="lazy"
//         />
//         {imgHover !== imgSrc && (
//           <img
//             src={imgHover}
//             alt={name}
//             className="product-card-new-arrival__image product-card-new-arrival__image--hover"
//             loading="lazy"
//           />
//         )}

//         {pre_order_status ? (
//           <span className="product-card-new-arrival__badge product-card-new-arrival__badge--preorder">PRE ORDER</span>
//         ) : isNew ? (
//           <span className="product-card-new-arrival__badge">NEW</span>
//         ) : isStockOut ? (
//           <span className="product-card-new-arrival__badge product-card-new-arrival__badge--stockout">Stock Out</span>
//         ) : null}
//       </div>

//       {/* ── Info ──────────────────────────────────────────── */}
//       <div className="product-card-new-arrival__info">
//         <p className="product-card-new-arrival__name">{name}</p>
//         <p className="product-card-new-arrival__price">
//           Tk. {Number(price).toLocaleString('en-BD')}
//         </p>
//       </div>
//     </Link>
//   );
// };

// export default ProductCardNewArrivels;