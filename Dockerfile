FROM node:22-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

FROM node:22-alpine
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY server/ ./
COPY --from=client-builder /app/client/dist ./public
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "app.js"]
