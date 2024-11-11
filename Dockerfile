FROM node:22-alpine
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]
