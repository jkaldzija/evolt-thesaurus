FROM node:8.11.3-stretch
RUN apt-get update && apt-get install apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y nginx nginx-extras yarn
COPY . /app
COPY nginx/app.conf /etc/nginx/conf.d/app.conf
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
 && ln -sf /dev/stderr /var/log/nginx/error.log
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
WORKDIR /app
RUN yarn install && yarn build
RUN cp -R /app/build/* /var/www
RUN rm -rf /app
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 8080
