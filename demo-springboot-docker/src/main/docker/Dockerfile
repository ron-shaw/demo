FROM frolvlad/alpine-oraclejdk8:slim
VOLUME /tmp
ADD demo-springboot-0.0.1-SNAPSHOT.jar demo-springboot.jar
RUN sh -c 'touch /demo-springboot.jar'
ENV JAVA_OPTS=""
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /demo-springboot.jar" ]