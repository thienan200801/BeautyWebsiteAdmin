# pull the base image
FROM node:14

# set the working direction
WORKDIR /usr/src/app

# install app dependencies
COPY package.json ./

#COPY package-lock.json ./

RUN yarn install


# add app
COPY . ./

RUN yarn run build

RUN yarn global add serve

EXPOSE 5000

# start app
CMD ["serve", "-s", "build"]
