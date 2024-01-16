FROM node:16

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

ARG SECRET_MONGO_URI
ENV SECRET_MONGO_URI ${SECRET_MONGO_URI}
ARG SECRET_JWT_SECRET
ENV SECRET_JWT_SECRET ${SECRET_JWT_SECRET}
ARG SECRET_PORT
ENV SECRET_PORT ${SECRET_PORT}

# RUN yarn install
RUN yarn install --production --ignore-engines

COPY . .

EXPOSE 4000

CMD ["node", "src/server.js"]