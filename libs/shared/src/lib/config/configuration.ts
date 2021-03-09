/* eslint-disable @typescript-eslint/ban-ts-comment */
export default () => ({
  mongo: {
    uri: process.env.MONGO_URI,
  },
  auth: {
    secret: process.env.JWT_SECRET,
  },
  queue: {
    host: process.env.BULL_QUEUE_HOST,
    port: process.env.BULL_QUEUE_PORT,
  },
  features: {
    user: {
      baseUrl: process.env.USER_BASE_URL,
    },
    article: {
      baseUrl: process.env.ARTICLE_BASE_URL,
    },
    tag: {
      baseUrl: process.env.TAG_BASE_URL,
    },
    profile: {
      baseUrl: process.env.PROFILE_BASE_URL,
    },
  },
});