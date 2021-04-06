const disableExternalIframes = (_req, res, next) => {
  res.setHeader('X-Frame-Options', 'deny')
  next()
}

export default disableExternalIframes
