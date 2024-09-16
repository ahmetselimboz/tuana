# First stage: Build
FROM node:16 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Second stage: Production
FROM node:16
WORKDIR /app
COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm install --only=production
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/next.config.js /app/next.config.js
CMD ["npm", "start"]
