# Verwende das offizielle OpenJDK-Image als Basis
FROM maven:3.8.3-openjdk-17

# Setze das Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Kopiere die Maven-Konfiguration und den Quellcode ins Container-Verzeichnis
COPY pom.xml .
COPY src ./src

# COPY ~/.m2/repository/ /root/.m2/repository/

# Lade die Abhängigkeiten herunter und erstelle das Jar
RUN mvn clean install -DskipTests

# Setze den Startbefehl für das Spring-Boot-Anwendungs-Jar
CMD ["java", "-jar", "target/kanban-backend.jar"]

EXPOSE 8080