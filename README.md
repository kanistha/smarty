## Proof of Concept on Docker, Cloud Foundry integration to run Spring Boot App or Liferay App
Spring Boot, RestServices, AngularsJS App

## Docker
    Download URL: https://docs.docker.com/docker-for-windows/
    #### CREATE DOCKERFILE
    #### CREATE APPLICATION BINARY (WAR/JAR …)
    #### PULL THE REQUIRED CONTAINER
    #### LOGIN TO DOCKER HUB
    #### BUILD DOCKER IMAGE
    #### PUSH IMAGE TO DOCKER HUB
    #### RUN DOCKER IMAGE

#### Create DockerFile
   ###### For WAR deployment:
        FROM snasello/liferay-6.2
        VOLUME /tmp
        ADD liferay-portal-6.2-ce-ga5.war /usr/local/tomcat/webapps/

   ###### For Java jar deployment
        FROM openjdk
        VOLUME /tmp
        ADD smarty-1.0-SNAPSHOT.jar smatry.jar
        RUN sh -c 'touch /smarty.jar'
        EXPOSE 8080
        USER "kanistha.acharya@hexad.de"
        ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/smarty.jar"]

Run following commands from directory where your binary is available along with DockerFile
     Example: D:\HOMEWARE\MyWorkspace\liferay

#### Pull the required container
    docker pull snasello/liferay-6.2
    Login to Docker Hub
    docker login
    Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
    Username (kanisthaa): kanisthaa
    Password:
    Login Succeeded


#### Build Docker Image:
    docker build -t kanisthaa/liferay-portal-6.2-app .
    Sending build context to Docker daemon 214.7 MB
    Step 1 : FROM snasello/liferay-6.2
     ---> ac2cd64c4e65
    Step 2 : VOLUME /tmp
     ---> Using cache
     ---> 7380bba5467d
    Step 3 : ADD liferay-portal-6.2-ce-ga5.war /usr/local/tomcat/webapps/
     ---> Using cache
     ---> 66d7b31270f8
    Successfully built 66d7b31270f8



#### Check Image
      Docker  images


#### Push Image to Docker Hub

    docker push kanisthaa/liferay-portal-6.2-app


#### Run Docker Image
    docker run -p 8080:8080 -t kanisthaa/liferay-portal-6.2-app
    docker run -p 8080:8080 -t kanisthaa/smarty


#### Try URL http://localhost:8080/web/guest/home


## Spring Boot & Docker: https://spring.io/guides/gs/spring-boot-docker/

