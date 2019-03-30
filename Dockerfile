FROM node:alpine
WORKDIR /usr/src/app
COPY . .
RUN npm run first-start
EXPOSE 5000
CMD [ "npm", "start" ]