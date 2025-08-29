FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG SERVICE=none
ENV SERVICE=$SERVICE
CMD ["sh", "-c", "node ${SERVICE}/server.js"]