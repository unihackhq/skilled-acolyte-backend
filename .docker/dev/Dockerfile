FROM node:9.11-alpine

WORKDIR /usr/src/app

# Copy the app into the image
COPY . ./

# Install nodemon
RUN npm -g install nodemon --loglevel error

RUN npm install --loglevel error

CMD [ "npm", "run", "docker-dev" ]
