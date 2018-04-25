FROM node:9.11-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json         /usr/src/app/
COPY ./package-lock.json    /usr/src/app/

# Install nodemon
RUN npm -g install nodemon --loglevel error

RUN npm install --loglevel error

CMD [ "npm", "run", "docker-dev" ]
