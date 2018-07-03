FROM node:10-alpine

WORKDIR /usr/src/app

# Copy the app into the image
COPY package.json .
COPY package-lock.json .

RUN npm ci

# Install nodemon
RUN npm -g install nodemon --loglevel error
