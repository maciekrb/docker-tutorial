#
# Docker compose
# 
# Dockerfile reference: https://docs.docker.com/engine/reference/builder/

FROM mhart/alpine-node:latest
COPY . /code
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
WORKDIR /code
RUN npm install
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["node"]
