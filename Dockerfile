FROM node:11.0.0
WORKDIR /home/node/app
COPY . .
RUN yarn install
RUN yarn build

CMD [ "yarn", "prod" ]

EXPOSE 3000