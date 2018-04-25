FROM node:9.11-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./app/                 /usr/src/app/app
COPY ./config/              /usr/src/app/config
COPY ./env.js               /usr/src/app/
COPY ./package.json         /usr/src/app/
COPY ./package-lock.json    /usr/src/app/
COPY ./index.js             /usr/src/app/

# Install nodemon
RUN npm -g install nodemon --loglevel error

RUN npm install --loglevel error

CMD [ "npm", "run", "docker-dev" ]
