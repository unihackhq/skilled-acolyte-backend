FROM node:9.11-alpine

WORKDIR /usr/src/app

# Copy the app into the image
COPY . ./

RUN npm install --loglevel error

CMD [ "npm", "run", "docker-start" ]
