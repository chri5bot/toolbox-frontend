# base image
FROM node:14.16.0-alpine

# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy project files
COPY . .

# build project
RUN npm run build

# set port
ENV PORT 3001

# start the app
CMD ["npm", "start"]