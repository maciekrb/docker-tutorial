#
# Docker cmd
# 
# Dockerfile reference: https://docs.docker.com/engine/reference/builder/

FROM mhart/alpine-node:latest
COPY . /code
WORKDIR /code
RUN npm install
CMD ["node", "echo.js"]
