FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json /app/

COPY . /app

RUN npm install -g nodemon

RUN npm install

EXPOSE 3000

CMD npm run start
