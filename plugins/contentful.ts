import contentful from 'contentful'

export const createClient = (config: contentful.CreateClientParams) => contentful.createClient({
  space: config.space,
  accessToken: config.accessToken,
})
