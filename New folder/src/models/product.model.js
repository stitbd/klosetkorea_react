/**
 * Product Model — defines the shape of a product entity.
 * In a typed project, this would be a TypeScript interface.
 */

/**
 * @typedef {Object} Product
 * @property {string}   id
 * @property {string}   name
 * @property {string}   sku
 * @property {number}   price
 * @property {number}   [originalPrice]
 * @property {string}   image
 * @property {string[]} [images]
 * @property {string}   category
 * @property {string}   [badge]       - e.g. "New", "Sale", "Hot"
 * @property {boolean}  inStock
 * @property {number}   [discount]    - percentage
 * @property {string}   [description]
 */

export const createProduct = ({
  id = "",
  name = "",
  sku = "",
  price = 0,
  originalPrice = null,
  image = "",
  images = [],
  category = "",
  badge = null,
  inStock = true,
  discount = null,
  description = "",
} = {}) => ({
  id,
  name,
  sku,
  price,
  originalPrice,
  image,
  images: images.length ? images : [image],
  category,
  badge,
  inStock,
  discount,
  description,
});

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 * @property {string} image
 * @property {string} slug
 */

export const createCategory = ({ id = "", name = "", image = "", slug = "" } = {}) => ({
  id,
  name,
  image,
  slug,
});

/**
 * @typedef {Object} HeroSlide
 * @property {string} id
 * @property {string} image
 * @property {string} title
 * @property {string} subtitle
 * @property {string} ctaText
 * @property {string} ctaLink
 */
export const createHeroSlide = ({
  id = "",
  image = "",
  title = "",
  subtitle = "",
  ctaText = "Shop Now",
  ctaLink = "/",
} = {}) => ({ id, image, title, subtitle, ctaText, ctaLink });
