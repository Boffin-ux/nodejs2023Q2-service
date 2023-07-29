FROM node:18-alpine

EXPOSE ${PORT}

WORKDIR /usr/app

COPY . .

COPY package*.json ./

RUN npm install

CMD ["npm", "run", "start:dev"]
