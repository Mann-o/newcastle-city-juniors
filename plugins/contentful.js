const contentful = require('contentful')

export default ({ app: { $config } }, inject) => {
  const contentfulClient = contentful.createClient({
    space: $config.contentfulSpace,
    accessToken: $config.contentfulAccessToken,
    environment: $config.contentfulEnvironment,
  })

  inject('contentful', contentfulClient)
}
