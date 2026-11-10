'use strict';

/**
 * Routes for Investment Products
 *
 * What is a route?
 * A route maps a URL to a controller action.
 * For example:
 *   GET /api/investment-products         → finds all products
 *   GET /api/investment-products/:id     → finds one product by ID
 *   POST /api/investment-products        → creates a new product
 *
 * createCoreRouter() automatically creates all standard REST routes for us.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::investment-product.investment-product');
