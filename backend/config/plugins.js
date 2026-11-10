const allowedMediaTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.*',
  'text/plain',
  'text/csv',
];

const deniedTypes = [
  'image/svg+xml',
  'application/vnd.microsoft.portable-executable',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-dosexec',
  'application/x-sh',
  'text/x-shellscript',
  'application/x-mach-binary',
];

module.exports = () => ({
  // Users & Permissions plugin - handles login, roles, JWT tokens
  'users-permissions': {
    config: {
      jwtManagement: 'refresh',
      sessions: {
        httpOnly: true,
      },
    },
  },

  // Upload plugin - controls what file types can be uploaded to Strapi
  upload: {
    config: {
      security: {
        allowedTypes: allowedMediaTypes,
        deniedTypes,
      },
    },
  },

  // i18n plugin - enables English, Sinhala, and Tamil language support
  // This allows content editors to manage content in multiple languages
  i18n: {
    enabled: true,
    config: {
      // Default language for the website
      defaultLocale: 'en',
      // All supported languages
      // 'en' = English, 'si' = Sinhala, 'ta' = Tamil
      locales: ['en', 'si', 'ta'],
    },
  },
});
