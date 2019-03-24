FROM ubuntu:14.04
RUN echo exit 0 > /usr/sbin/policy-rc.d
RUN apt-get update && apt-get install -y nginx nginx-extras
COPY conf/app.conf /etc/nginx/conf.d/app.conf
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
 && ln -sf /dev/stderr /var/log/nginx/error.log
CMD ["nginx", "-g", "daemon off;"]
