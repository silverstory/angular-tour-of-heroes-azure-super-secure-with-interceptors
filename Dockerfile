# Client App
FROM node:8.10.0 as client-app
LABEL authors="Eprel"
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install -g @angular/cli --silent
RUN npm install --silent
COPY . .
RUN ng build --prod --build-optimizer

# Node server
FROM node:8.10.0 as node-server
WORKDIR /usr/src/app
COPY ["./src/server/package.json", "./src/server/package-lock.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
RUN npm install --production --silent
COPY ./src/server /usr/src/app

# Final image
FROM node:8.10.0
WORKDIR /usr/src/app
COPY --from=node-server /usr/src/app /usr/src/app
COPY --from=client-app /usr/src/app/dist ./
EXPOSE 3000
CMD ["node", "index"]