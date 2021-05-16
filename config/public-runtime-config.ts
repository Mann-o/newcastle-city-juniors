export const publicRuntimeConfig = {
  googleApiKey: process.env.GOOGLE_API_KEY,

  contentfulSpace: process.env.CONTENTFUL_SPACE,
  contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  contentfulEnvironment: process.env.CONTENTFUL_ENVIRONMENT || 'master',

  contentfulHomepageConfig: process.env.CONTENTFUL_HOMEPAGE_CONFIG,
  contentfulAgeGroupContentType: process.env.CONTENTFUL_AGE_GROUP_CONTENT_TYPE || 'ageGroup',
  contentfulTeamContentType: process.env.CONTENTFUL_TEAM_CONTENT_TYPE || 'team',
}
