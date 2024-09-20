# Stage 1: Build the application
FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the application
FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000


CMD ["npm", "run", "start"]
