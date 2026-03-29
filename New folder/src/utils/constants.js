// ─── App-wide constants ────────────────────────────────────────────────────────

export const APP_NAME = "elonis";
export const CURRENCY = "৳";
export const API_BASE = process.env.REACT_APP_API_URL || "https://api.fimon.com.bd/v1";
export const USE_MOCK  = process.env.REACT_APP_USE_MOCK !== "false";


export const NAV_LINKS = [
  {
    label: "MAN",
    href: "/man",
    children: [
      {
        label: "Eid 26",
        href: "/product-list/68",
      },
      {
        label: "Ethnic Wear",
        href: "/product-list/18",
        children: [
          { label: "Panjabi", href: "/products/20" },
          { label: "Kabli", href: "/products/21" },
          { label: "Vest", href: "/products/22" },
        ],
      },
      {
        label: "T-Shirt",
        href: "/product-list/19",
      },
      {
        label: "Shirt",
        href: "/product-list/4",
        children: [
          { label: "Formal", href: "/products/1" },
          { label: "Casual", href: "/products/2" },
          { label: "Half Sleeve", href: "/products/72" },
          { label: "Full Sleeve", href: "/products/76" },
          { label: "Printed", href: "/products/73" },
          { label: "Solid", href: "/products/74" },
          { label: "Club", href: "/products/75" },
        ],
      },
      {
        label: "Polo",
        href: "/product-list/3",
      },
      {
        label: "Bottom",
        href: "/product-list/5",
        children: [
          { label: "Jeans", href: "/products/7" },
          { label: "Chinos", href: "/products/4" },
          { label: "Formal", href: "/products/3" },
          { label: "Joggers", href: "/products/5" },
          { label: "Cargo", href: "/products/71" },
          { label: "Shorts", href: "/products/6" },
          { label: "Pajama", href: "/products/44" },
        ],
      },
      {
        label: "Suits & Blazer",
        href: "/product-list/72",
      },
      {
        label: "Winterwear",
        href: "/product-list/70",
        children: [
          { label: "Winter Shirt", href: "/products/85" },
          { label: "Jacket", href: "/products/61" },
          { label: "Sweater", href: "/products/62" },
          { label: "Sweatshirt", href: "/products/63" },
          { label: "Hoodie", href: "/products/64" },
        ],
      },
      {
        label: "Underwear",
        href: "/product-list/57",
      },
      {
        label: "Footwear",
        href: "/product-list/6",
        children: [
          { label: "Sneakers", href: "/products/32" },
          { label: "Sandal", href: "/products/30" },
          { label: "Boot", href: "/products/33" },
        ],
      },
      {
        label: "Accessories",
        href: "/product-list/42",
        children: [
          { label: "Mask", href: "/products/27" },
          { label: "Socks", href: "/products/28" },
          { label: "Tie", href: "/products/41" },
          { label: "Belt", href: "/products/52" },
        ],
      },
    ],
  },

  {
    label: "WOMAN",
    href: "/woman",
    children: [
      {
        label: "Eid 26",
        href: "/product-list/69",
      },
      {
        label: "Western Wear",
        href: "/product-list/8",
        children: [
          { label: "Tops", href: "/products/77" },
          { label: "T-Shirt", href: "/products/78" },
          { label: "Summer Blazer", href: "/products/84" },
          { label: "Casual Shirt", href: "/products/9" },
          { label: "Long Shirt", href: "/products/10" },
        ],
      },
      {
        label: "Traditional Wear",
        href: "/product-list/9",
        children: [
          { label: "Kameez", href: "/products/79" },
          { label: "Kurti", href: "/products/80" },
          { label: "Kaftan", href: "/products/81" },
        ],
      },
      {
        label: "Dress",
        href: "/product-list/34",
      },
      {
        label: "Co-ord Sets",
        href: "/product-list/71",
      },
      {
        label: "Winterwear",
        href: "/product-list/39",
        children: [
          { label: "Hoodie", href: "/products/86" },
          { label: "Jacket", href: "/products/34" },
          { label: "Overcoat", href: "/products/36" },
          { label: "Poncho", href: "/products/53" },
          { label: "Sweater", href: "/products/55" },
        ],
      },
      {
        label: "Shrug",
        href: "/product-list/13",
      },
      {
        label: "Bottoms",
        href: "/product-list/11",
        children: [
          { label: "Jeans", href: "/products/11" },
          { label: "Skirts/Palazzo", href: "/products/14" },
          { label: "Pants", href: "/products/15" },
          { label: "Joggers", href: "/products/29" },
        ],
      },
    ],
  },

  {
    label: "LIFESTYLE",
    href: "/lifestyle",
    children: [
      {
        label: "Wallet/Money Clip",
        href: "/product-list/22",
      },
      {
        label: "Perfume",
        href: "/product-list/23",
        children: [
          { label: "Man", href: "/products/65" },
        ],
      },
      {
        label: "Privilege Card/Gold Card",
        href: "/product-list/27",
      },
      {
        label: "Bag",
        href: "/product-list/29",
        children: [
          { label: "Man", href: "/products/67" },
          { label: "Woman", href: "/products/68" },
        ],
      },
      {
        label: "Sunglass",
        href: "/product-list/59",
        children: [
          { label: "Man", href: "/products/69" },
          { label: "Woman", href: "/products/70" },
        ],
      },
    ],
  },

  {
    label: "GIFT VOUCHER",
    href: "/gift-voucher",
  },
];

// export const NAV_LINKS = [
//   //{ label: "Home",              href: "/" },
//   { label: "Man",               href: "/man" },
//   { label: "Woman",             href: "/woman" },
//   { label: "Lifestyle",         href: "/Lifestyle" },
//   { label: "Get Voucher",       href: "/getVoucher" },
//   // { label: "Package",           href: "/collections/package" },
//   // { label: "Perfume",           href: "/collections/perfume" },
//   // { label: "Financing Offer",   href: "/financing" },
//   // { label: "Women",             href: "/collections/women" },
//   // { label: "Pages",             href: "/pages" },
// ];

export const PAYMENT_METHODS = ["bKash", "Nagad", "Visa", "Mastercard", "COD"];

export const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280 };

export const QUERY_KEYS = {
  HOME_SECTIONS: "home-sections",
  PRODUCTS:      "products",
  PRODUCT:       "product",
  CATEGORIES:    "categories",
};
