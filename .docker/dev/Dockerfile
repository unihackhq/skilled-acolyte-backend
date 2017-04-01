FROM node:7.8.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./app/            /usr/src/app/app
COPY ./config/*        /usr/src/app/config/
COPY ./env.js          /usr/src/app/
COPY ./package.json    /usr/src/app/
COPY ./index.js        /usr/src/app/

RUN npm install > /dev/null

CMD [ "npm", "run", "docker-dev" ]