# этап сборки (build stage)
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# этап production
FROM node:18-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /app .
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
