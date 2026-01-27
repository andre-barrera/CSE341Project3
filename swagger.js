const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE Project 03 API',
    description: 'API documentation for Products and Orders'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);