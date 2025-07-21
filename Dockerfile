FROM node:20-alpine3.20

WORKDIR /app

# Install bash, Python, and build dependencies for node-gyp
RUN apk add --no-cache bash python3 make g++

COPY package*.json ./
RUN npm install

COPY . .

RUN npx tsc

EXPOSE 3000

CMD ["npm", "run", "start-no-compile"]