/* eslint-disable @typescript-eslint/ban-ts-comment */
export default () => ({
  mongo: {
    // @ts-ignore
    uri: process.env.MONGO_URI,
  },
  auth: {
    secret: process.env.JWT_SECRET,
  },
  features: {
    user: {
      // @ts-ignore
      baseUrl: process.env.USER_BASE_URL,
    },
    article: {
      // @ts-ignore
      baseUrl: process.env.ARTICLE_BASE_URL,
    },
    tag: {
      // @ts-ignore
      baseUrl: process.env.TAG_BASE_URL,
    },
    profile: {
      // @ts-ignore
      baseUrl: process.env.PROFILE_BASE_URL,
    },
  },
});