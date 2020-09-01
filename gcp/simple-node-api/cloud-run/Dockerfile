FROM node:12-slim

WORKDIR /app

COPY package.json ./

RUN npm install --only=production

COPY . ./

CMD ["node", "index.js"]