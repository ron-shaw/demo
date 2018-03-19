#FROM frolvlad/alpine-oraclejdk8
FROM ronshaw/centos-jdk8
VOLUME /dubbo-service

#安装NC
#RUN wget http://vault.centos.org/6.6/os/x86_64/Packages/nc-1.84-22.el6.x86_64.rpm
#RUN rpm -iUv nc-1.84-22.el6.x86_64.rpm

ADD demo-service-provider-assembly.tar.gz /dubbo-service/demo-service-provider.tar.gz
RUN sh -c 'touch /dubbo-service/demo-service-provider.tar.gz'
RUN sh -c 'chmod 777 /dubbo-service'

#tar.gz自动解压，此处不需要
#RUN sh -c 'tar xzvf /demo-service-provider.tar.gz'

ENV JAVA_OPTS=""

#开启内部服务端口
EXPOSE 20771
EXPOSE 20772

#RUN的默认启动命令
#CMD ["sh", "/dubbo-service/demo-service-provider.tar.gz/demo-service-provider/bin/start-centos7.sh && top", "run"]
ENTRYPOINT /dubbo-service/demo-service-provider.tar.gz/demo-service-provider/bin/start-centos7.sh && tail -f /dubbo-service/demo-service-provider.tar.gz/logs/stdout.log