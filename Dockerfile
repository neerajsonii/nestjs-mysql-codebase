ARG NODE_VERSION

FROM node:${NODE_VERSION}

WORKDIR /app

COPY package.json package-lock.json /app/

COPY . /app

RUN npm install -g nodemon

RUN npm install

EXPOSE 3000

CMD npm run start
