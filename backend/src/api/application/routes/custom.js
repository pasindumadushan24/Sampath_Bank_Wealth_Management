'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/applications/:id/pdf',
      handler: 'application.downloadPdf',
      config: {
        auth: false,
      },
    },
  ],
};
