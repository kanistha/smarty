## Proof of Concept on Docker, Cloud Foundry integration to run
   * Spring Boot, RestServices, AngularsJS App
   * Liferay App

## Cloud Foundry

#### Login to CF
        Run command 'cf login'

            API endpoint: https://api.run.pivotal.io

            Email> kanistha.acharya@hexad.de

            Password>
            Authenticating...
            OK

            Targeted org kanistha-org

            Targeted space development



            API endpoint:   https://api.run.pivotal.io (API version: 2.63.0)
            User:           kanistha.acharya@hexad.de
            Org:            kanistha-org
            Space:          development

#### Create a manifest file manifest.yml:
            ---
            applications:
            - name: smart-app
              memory: 512M

#### Build :
         mvn clean package

#### Push to cloud foundry
        cf push smart-app -p target/app-1.0-SNAPSHOT.jar

        Creating app smart-app in org kanistha-org / space development as kanistha.acharya@hexad.de...
        OK

        Creating route smart-app.cfapps.io...
        OK

        Binding smart-app.cfapps.io to smart-app...
        OK

        Uploading smart-app...
        Uploading app files from: C:\Users\HEXADG~1\AppData\Local\Temp\unzipped-app994823835
        Uploading 324.8K, 100 files
        Done uploading
        OK

        Starting app smart-app in org kanistha-org / space development as kanistha.acharya@hexad.de...
        ....
        Downloading java_buildpack...
        Staging...
        -----> Java Buildpack Version: v3.9 (offline) | https://github.com/cloudfoundry/java-buildpack.git#b050954
        -----> Downloading Open Jdk JRE 1.8.0_101 from https://java-buildpack.cloudfoundry.org/openjdk/trusty/x86_64/openjdk-1.8.0_101.tar.gz (found in cache)
               Expanding Open Jdk JRE to .java-buildpack/open_jdk_jre (1.2s)
        -----> Downloading Open JDK Like Memory Calculator 2.0.2_RELEASE from https://java-buildpack.cloudfoundry.org/memory-calculator/trusty/x86_64/memory-calculator-2.0.2_RELEASE.tar.g
        z (found in cache)
               Memory Settings: -XX:MetaspaceSize=104857K -Xmx681574K -XX:MaxMetaspaceSize=104857K -Xss349K -Xms681574K
        -----> Downloading Spring Auto Reconfiguration 1.10.0_RELEASE from https://java-buildpack.cloudfoundry.org/auto-reconfiguration/auto-reconfiguration-1.10.0_RELEASE.jar (found in c
        ache)
        Exit status 0
        Staging complete
        Uploading droplet, build artifacts cache...
        Uploading build artifacts cache...
        Uploading droplet...
        Uploaded build artifacts cache (110B)
        Uploaded droplet (57.5M)
        Uploading complete
        Destroying container
        Successfully destroyed container

        0 of 1 instances running, 1 starting
        0 of 1 instances running, 1 starting
        0 of 1 instances running, 1 starting
        1 of 1 instances running

        App started


        OK

        App smart-app was started using this command `CALCULATED_MEMORY=$($PWD/.java-buildpack/open_jdk_jre/bin/java-buildpack-memory-calculator-2.0.2_RELEASE -memorySizes=metaspace:64m..
        ,stack:228k.. -memoryWeights=heap:65,metaspace:10,native:15,stack:10 -memoryInitials=heap:100%,metaspace:100% -stackThreads=300 -totMemory=$MEMORY_LIMIT) && JAVA_OPTS="-Djava.io.t
        mpdir=$TMPDIR -XX:OnOutOfMemoryError=$PWD/.java-buildpack/open_jdk_jre/bin/killjava.sh $CALCULATED_MEMORY" && SERVER_PORT=$PORT eval exec $PWD/.java-buildpack/open_jdk_jre/bin/jav
        a $JAVA_OPTS -cp $PWD/. org.springframework.boot.loader.JarLauncher`

        Showing health and status for app smart-app in org kanistha-org / space development as kanistha.acharya@hexad.de...
        OK

        requested state: started
        instances: 1/1
        usage: 512M x 1 instances
        urls: smart-app.cfapps.io
        last uploaded: Tue Oct 18 15:15:14 UTC 2016
        stack: cflinuxfs2
        buildpack: java-buildpack=v3.9-offline-https://github.com/cloudfoundry/java-buildpack.git#b050954 java-main open-jdk-like-jre=1.8.0_101 open-jdk-like-memory-calculator=2.0.2_RELEA
        SE spring-auto-reconfiguration=1.10.0_RELEASE

             state     since                    cpu      memory           disk           details
        #0   running   2016-10-18 05:16:09 PM   128.5%   251.9M of 512M   137.2M of 1G

#### Show Applications
        cf apps
            Getting apps in org kanistha-org / space development as kanistha.acharya@hexad.de...
            OK

            name               requested state   instances   memory   disk   urls
            cf-spring          stopped           0/1         512M     1G     cf-spring-arytenoid-packer.cfapps.io
            kanisthaa/smarty   stopped           0/1         1G       1G     kanisthaasmarty.cfapps.io
            smart-app          started           1/1         512M     1G     smart-app.cfapps.io
            smarty             stopped           0/1         1G       1G     smarty.cfapps.io


## Docker
    Download URL: https://docs.docker.com/docker-for-windows/
     * CREATE DOCKERFILE
     * CREATE APPLICATION BINARY (WAR/JAR …)
     * PULL THE REQUIRED CONTAINER
     * LOGIN TO DOCKER HUB
     * BUILD DOCKER IMAGE
     * PUSH IMAGE TO DOCKER HUB
     * RUN DOCKER IMAGE

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

#### Spring Boot & Docker: https://spring.io/guides/gs/spring-boot-docker/
