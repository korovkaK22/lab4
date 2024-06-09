import swaggerJSDoc from 'swagger-jsdoc';
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Taxi service',
      version: '1.0.0',
      description: 'API documentation',
    },
  },
  apis: [__dirname+ '/web/routers/driver.*'], // Absolute path to the API routes
};
const doc= swaggerJSDoc(options);
export default doc;