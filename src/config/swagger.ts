import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swapspace API Documentation',
      version: '1.0.0',
      description: 'API documentation for Swapspace backend',
    },
    servers: [
      {
        url: 'http://localhost:6001',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            email: { type: 'string' },
            number: { type: 'string' },
            type: { type: 'string', enum: ['USER', 'AGENT', 'ADMIN'] },
            verifiedEmail: { type: 'boolean' },
            verifiedNumber: { type: 'boolean' }
          }
        },
        Property: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            property_title: { type: 'string' },
            property_type: { type: 'string' },
            sale_or_rent_price: { type: 'string' },
            country: { type: 'string' },
            locality: { type: 'string' }
          }
        },
        Profile: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            fullname: { type: 'string' },
            address: { type: 'string' },
            image: { type: 'string' }
          }
        }
      }
    },
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Users', description: 'User management endpoints' },
      { name: 'Properties', description: 'Property management endpoints' },
      { name: 'Profiles', description: 'User profile endpoints' },
      { name: 'Feedback', description: 'Feedback management endpoints' },
      { name: 'Teams', description: 'Team management endpoints' },
      { name: 'Agents', description: 'Agent management endpoints' },
      { name: 'Ratings', description: 'Rating system endpoints' },
      { name: 'Tasks', description: 'Task management endpoints' }
    ],
    security: [{
      bearerAuth: [],
    }],
  },
  apis: [
    './src/router/*.ts',
    './src/controllers/*.ts',
    './src/models/*.ts'
  ],
};

export const specs = swaggerJsdoc(options); 