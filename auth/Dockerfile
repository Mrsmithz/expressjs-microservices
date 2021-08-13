FROM node:14.15-alpine

WORKDIR /usr/src/app

COPY src src/
COPY package.json ./

RUN npm install --only=prod

EXPOSE 10000

CMD ["npm", "run", "build"]