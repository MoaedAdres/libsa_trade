import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  rateLimit: {
    ttl: parseInt(process.env.RATE_LIMIT_TTL, 10) || 60,
    max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
  },
  commission: {
    rental: parseFloat(process.env.DEFAULT_RENTAL_COMMISSION) || 12,
    sale: parseFloat(process.env.DEFAULT_SALE_COMMISSION) || 8,
    consignment: parseFloat(process.env.DEFAULT_CONSIGNMENT_COMMISSION) || 18,
  },
}));
