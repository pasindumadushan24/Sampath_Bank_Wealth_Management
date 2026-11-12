'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const { buildApplicationPdfBuffer } = require('../services/pdf');

module.exports = createCoreController('api::application.application', ({ strapi }) => ({
  
  async downloadPdf(ctx) {
    const { id } = ctx.params;
    if (!id) {
      return ctx.badRequest('Application ID or Reference Number is required');
    }

    let application = null;
   
    if (!isNaN(id)) {
      try {
        application = await strapi.db.query('api::application.application').findOne({
          where: { id: Number(id) },
        });
      } catch (err) {
       
      }
    }

    
    if (!application) {
      try {
        application = await strapi.db.query('api::application.application').findOne({
          where: {
            $or: [
              { referenceNumber: id },
              { documentId: id },
            ],
          },
        });
      } catch (err) {
        
      }
    }

    
    if (!application && strapi.documents) {
      try {
        application = await strapi.documents('api::application.application').findOne({
          documentId: id,
        });
      } catch (err) {
        
      }
    }

    if (!application) {
     
      ctx.status = 404;
      ctx.body= { error: 'Not Found', message: `Application with ID or reference "${id}" not found.` };
      return;
    }

    const pdfBuffer = buildApplicationPdfBuffer(application);
    const filename = `Sampath_Application_${application.referenceNumber || application.id}.pdf`;

    ctx.set('Content-Type', 'application/pdf');
    ctx.set('Content-Disposition', `attachment; filename="${filename}"`);
    ctx.body = pdfBuffer;
  },

 
  async create(ctx) {
    const response = await super.create(ctx);
    try {
      const data = response?.data;
      if (data) {
        const appId = data.id || data.documentId;
        const ref = data.attributes?.referenceNumber || data.referenceNumber || appId;
        const downloadUrl = `http://localhost:1337/api/applications/${ref}/pdf`;

        await strapi.db.query('api::application.application').update({
          where: { id: data.id || appId },
          data: { pdfDownloadUrl: downloadUrl },
        });

        if (data.attributes) {
          data.attributes.pdfDownloadUrl = downloadUrl;
        } else {
          data.pdfDownloadUrl = downloadUrl;
        }
      }
    } catch (err) {
      
    }
   return response;
  },
}));
