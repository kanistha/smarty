FROM openjdk
VOLUME /tmp
ADD smarty-1.0-SNAPSHOT.jar smatry.jar
RUN sh -c 'touch /smarty.jar'
EXPOSE 8080
USER "kanistha.acharya@hexad.de"
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/smarty.jar"]