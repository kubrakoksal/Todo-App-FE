FROM node:lts-alpine
ARG APP_IP_ADDRESS
ARG APP_PORT
RUN npm install -g http-server
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "http-server", "dist" ]