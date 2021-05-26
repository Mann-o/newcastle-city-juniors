export const proxy = {
  '/api/': {
    pathRewrite: {
      '^/api/': '/api/v1/',
    },
    logLevel: (process.env.DEBUG === 'true') ? 'debug' : 'info',
    target: process.env.BACKEND_URL,
    headers: {
      'NCL-App-Key': process.env.BACKEND_APP_KEY,
    },
    retry: true,
  },
}
