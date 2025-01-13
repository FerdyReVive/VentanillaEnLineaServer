
FROM node AS build-env
RUN mkdir ArchivosProyecto
WORKDIR /app

COPY . ./

RUN npm install

FROM node
WORKDIR /app
COPY --from=build-env /app/ .
ENTRYPOINT [ "node", "app.js"]
