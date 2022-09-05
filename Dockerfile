 FROM node:12.2.0-alpine
 # create app directory
 RUN mkdir -p /usr/src/app
 WORKDIR /usr/src/app
 #install dependencies
 COPY package.json /usr/src/app
 RUN npm config set unsafe-perm true && npm install && npm install gulp-cli -g && npm install gulp && npm install pm2 -g
 # bundle source
 COPY . /usr/src/app
 RUN gulp test
 EXPOSE 3000
#  CMD ["gulp", "test"]
 CMD ["pm2-runtime", "app.js"]
