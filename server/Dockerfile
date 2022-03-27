FROM node:16.13.2

WORKDIR /app

ENV MONGO_HOST mongo
ENV MONGO_PORT 27017
ENV MONGO_URI mongodb://127.0.0.1:27017/tww?retryWrites=true

COPY package.json ./

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]
