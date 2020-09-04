FROM node:12-slim

# Expose port
EXPOSE 3000
# Set desired port
ENV PORT 3000

WORKDIR /app

COPY package.json ./

RUN npm install --only=production

COPY . ./

CMD ["npm", "start"]
