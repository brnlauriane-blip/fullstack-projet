FROM maven:3.9.11-eclipse-temurin-17 AS build
WORKDIR /projet-backend
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /projet-backend/target/*.jar app.jar
EXPOSE 8042
ENV JAVA_OPTS="-Xmx512m -Xms256m"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]


