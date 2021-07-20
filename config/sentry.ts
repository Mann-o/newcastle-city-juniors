export const sentry = {
  dsn: process.env.SENTRY_DSN,

  config: {
    environment: process.env.NODE_ENV,
  },

  tracing: {
    tracesSampleRate: process.env.SENTRY_TRACES_SAMPLE_RATE,
  },
}
