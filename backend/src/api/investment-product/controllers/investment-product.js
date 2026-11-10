'use strict';

/**
 * Controller for Investment Products
 *
 * What is a controller?
 * When someone makes an API request (e.g. GET /api/investment-products),
 * the controller receives that request and decides what to do with it.
 *
 * createCoreController() is a Strapi helper that automatically gives us
 * the standard actions: find, findOne, create, update, delete
 * We don't need to write those manually.
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::investment-product.investment-product');
