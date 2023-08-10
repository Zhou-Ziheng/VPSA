FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install typescript -g
# If you are building your code for production
RUN npm ci --only=production

COPY . .

EXPOSE 4000

RUN npm run build

ENV REDIS=vpsa-redis

CMD ["node", "dist/server.js" ]