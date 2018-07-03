FROM node:10-alpine

WORKDIR /usr/src/app

# Copy the app into the image
COPY . ./

# Install nodemon
RUN npm -g install nodemon --loglevel error

RUN npm ci
