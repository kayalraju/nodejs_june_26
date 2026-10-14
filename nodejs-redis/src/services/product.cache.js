const {
  getCache,
  setCache,
  deleteCache,
} = require("../utils/redisCache");

const PRODUCT_CACHE_KEY = "products:all";

const getProductsCache = async () => {
  return await getCache(PRODUCT_CACHE_KEY);
};

const setProductsCache = async (products) => {
  return await setCache(
    PRODUCT_CACHE_KEY,
    products,
    300
  );
};

const clearProductsCache = async () => {
  return await deleteCache(PRODUCT_CACHE_KEY);
};

// 3. IMPORTANT
    // If you want slug requests to use Redis,
    // store this product separately.

// const getProductBySlugCache = async (slug) => {
//   return await getCache(`products:slug:${slug}`);
// };

// const setProductBySlugCache = async (slug, product) => {
//   return await setCache(
//     `products:slug:${slug}`,
//     product,
//     300
//   );
// };

// const clearProductBySlugCache = async (slug) => {
//   return await deleteCache(
//     `products:slug:${slug}`
//   );
// };

module.exports = {
  getProductsCache,
  setProductsCache,
  clearProductsCache,
  // getProductBySlugCache,
  // setProductBySlugCache,
  // clearProductBySlugCache,
};
