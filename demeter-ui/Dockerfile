# Stage 1 : build the React application
FROM node:18 as build-stage

WORKDIR /demeter-ui
COPY package.json .
RUN npm install
COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

# Stage 2 : serve the React application with nginx
FROM nginx:1.17.0-alpine

COPY --from=build-stage /demeter-ui/build /usr/share/nginx/html
EXPOSE $REACT_DOCKER_PORT

# stay in the foreground
CMD nginx -g 'daemon off;'
