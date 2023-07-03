FROM node:18-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

#COPY package*.json ./
#RUN npm ci
#COPY . ./
#RUN npm run build

COPY package.json yarn.lock /app
RUN cd /app

RUN yarn install --pure-lockfile

COPY . /app

RUN yarn build

#Server
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

cmd ["nginx", "-g", "daemon off;"]
