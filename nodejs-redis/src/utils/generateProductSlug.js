const slugify = require("slugify");

const generateProductSlug = (name, category) => {
  return slugify(`${category} ${name}`, {
    lower: true,
    strict: true,
    trim: true,
  });
};

module.exports = generateProductSlug;