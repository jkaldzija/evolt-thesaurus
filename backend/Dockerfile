FROM java:8
FROM maven:alpine

WORKDIR /app
ADD pom.xml /app
RUN mvn verify clean --fail-never

COPY . /app
RUN mvn -v
RUN mvn clean install

ENTRYPOINT ["java","-jar","/app/target/test-1.0.2.jar"]