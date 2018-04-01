FROM node:8.10.0
LABEL authors="Eprel"
WORKDIR /usr/src/app
COPY ./dist .
EXPOSE 3000
CMD ["node", "index"]