module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',

  // CORS configuration - this allows our Next.js frontend to talk to Strapi
  {
    name: 'strapi::cors',
    config: {
      // List of allowed origins (websites that can make requests to Strapi)
      origin: [
        'http://localhost:3000',   // Next.js frontend (development)
        'http://localhost:1337',   // Strapi itself
      ],
      // HTTP methods that are allowed
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      // Headers that are allowed in requests
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      // Allow cookies to be sent with requests
      credentials: true,
    },
  },

  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
