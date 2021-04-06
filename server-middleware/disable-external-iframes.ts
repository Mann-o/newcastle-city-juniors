import { ServerMiddleware } from '@nuxt/types'

const disableExternalIframes: ServerMiddleware = (_req, res, next) => {
  res.setHeader('X-Frame-Options', 'deny')
  next()
}

export default disableExternalIframes
