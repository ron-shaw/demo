#使用的基础镜像
FROM tomcat:slim
#作者信息
MAINTAINER xiaorz "xiaorz@jingzhengu.com"
VOLUME /tmp
RUN sh -c 'rm -rf /usr/local/tomcat/webapps/*'
ADD demo-front-web-dev-1.0-SNAPSHOT.war /usr/local/tomcat/webapps/ROOT.war
RUN sh -c 'touch /ROOT.war'

ENV JAVA_OPTS=""
#开启内部服务端口
EXPOSE 8080
#启动Tomcat
CMD /usr/local/tomcat/bin/catalina.sh run