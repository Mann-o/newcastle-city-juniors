require('dotenv').config()

export const server = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
}
