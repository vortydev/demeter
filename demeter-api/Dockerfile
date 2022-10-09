FROM node:18

WORKDIR /demeter-api
COPY package.json .
RUN npm install
COPY . .
CMD npm start
