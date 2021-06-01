FROM node:12-buster-slim

WORKDIR /app

COPY package.json package-lock.json /app/

COPY . /app

RUN npm install -g nodemon

RUN npm install

RUN npm run build

EXPOSE 3000

CMD npm run start:debug
