FROM node:6.11.2-alpine

ARG GIT_HASH
ENV GIT_HASH ${GIT_HASH}

# Create service directory
RUN mkdir -p /app
WORKDIR /app

# Bundle service source
COPY . /app

# Install service dependencies
COPY ./package.json ./yarn.lock /app/
RUN yarn && yarn run docker-build

EXPOSE 3000
CMD ["/bin/sh", "./docker.sh"]
