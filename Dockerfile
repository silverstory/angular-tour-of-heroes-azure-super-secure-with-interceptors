# Client App before: node:8.10.0
FROM node:8.10.0-slim as client-app
USER node
LABEL authors="Eprel"
WORKDIR /usr/src/app
RUN mkdir /home/node/.npm-global ; \
    mkdir -p /home/node/app ; \
    chown -R node:node /home/node/app ; \
    chown -R node:node /home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
RUN npm install --quiet --no-progress -g @angular/cli
COPY ["package.json", "package-lock.json*", "./"]
# OR TRY: RUN npm install -g @angular/cli --unsafe --silent
RUN npm -g config set user root
RUN npm install --quiet
COPY . .
RUN ng build --prod --build-optimizer
RUN npm cache clean --force

# Node server
FROM node:8.10.0-slim as node-server
WORKDIR /usr/src/app
COPY ["./src/server/package.json", "./src/server/package-lock.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
RUN npm install --production --quiet
COPY ./src/server /usr/src/app

# Final image
FROM node:8.10.0-slim
WORKDIR /usr/src/app
COPY --from=node-server /usr/src/app /usr/src/app
COPY --from=client-app /usr/src/app/dist ./
EXPOSE 3000
CMD ["node", "index"]