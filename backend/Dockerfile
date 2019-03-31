FROM java:8
FROM maven:alpine

ENV profile default

WORKDIR /app
ADD pom.xml /app

COPY . /app
RUN mvn clean install -P$profile

RUN ["chmod", "+x", "/app/start.sh"]

ENTRYPOINT ["/bin/bash", "-c", "/app/start.sh $profile"]