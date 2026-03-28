FROM node:18-slim

WORKDIR /app

RUN apt-get update && apt-get install -y docker.io

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]