const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE Project 03 API',
    description: 'API documentation for Products and Orders'
  },
  host: 'localhost:3000',
  schemes: ['http'],

  securityDefinitions: {
    githubAuth: {
      type: 'oauth2',
      authorizationUrl: '/login',
      flow: 'implicit'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);