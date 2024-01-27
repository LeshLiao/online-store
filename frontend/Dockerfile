FROM node:16.15-alpine

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

# RUN yarn install
RUN yarn install --production --ignore-engines

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]