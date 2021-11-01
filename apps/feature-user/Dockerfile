FROM node:14.17.0
ENV PORT=3334
ENV NODE_ENV=production
EXPOSE $PORT
COPY /dist /app
WORKDIR /app
SHELL ["/bin/bash", "-c"]
RUN source .env
RUN npm i yarn
RUN yarn
CMD node main.js
