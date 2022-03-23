FROM node:16-alpine

WORKDIR /app

ENV MONGO_HOST mongo
ENV MONGO_PORT 27017

COPY package.json ./

RUN npm install

RUN npm run build

COPY ./build .

EXPOSE 8080

CMD ["npm", "run", "start"]
