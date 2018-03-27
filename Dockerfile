# base image
FROM node:8.10.0 as client-app

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli@1.7.2

# add app
COPY . /usr/src/app

# build app
RUN ng build --prod --build-optimizer

# Node server
FROM node:8.10.0 as node-server
WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
# COPY ["./src/server/package.json", "./src/server/package-lock.json", "./"]
# RUN npm install --production --silent && mv node_modules ../
RUN npm install --production --quiet
COPY ./src/server /usr/src/app

# Final image
FROM node:8.10.0
WORKDIR /usr/src/app
# COPY --from=node-server /usr/src /usr/src
COPY --from=node-server /usr/src/app /usr/src/app
COPY --from=client-app /usr/src/app/dist ./
EXPOSE 3000
CMD ["node", "index"]