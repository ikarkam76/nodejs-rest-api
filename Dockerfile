FROM node:12-alpine
WORKDIR /nodejs-rest-api
COPY . .
RUN npm install --production
CMD ["node", "/nodejs-rest-api/server.js"]