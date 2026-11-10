'use strict';

/**
 * Service for Investment Products
 *
 * What is a service?
 * A service contains the actual database logic.
 * When the controller receives a request, it calls the service to
 * read from or write to the MySQL database.
 *
 * createCoreService() automatically gives us all standard database operations:
 * find, findOne, create, update, delete
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::investment-product.investment-product');
