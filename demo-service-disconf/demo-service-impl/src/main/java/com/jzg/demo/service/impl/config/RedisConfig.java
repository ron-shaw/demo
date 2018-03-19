package com.jzg.demo.service.impl.config;

import com.baidu.disconf.client.common.annotations.DisconfFile;
import com.baidu.disconf.client.common.annotations.DisconfFileItem;
import com.baidu.disconf.client.common.update.IDisconfUpdate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

/**
 * @description: RedisConfig
 * @author: JZG
 * @date: 2018/2/5 18:16
 * @version: v1.0.0
 */
@Service
@Scope("singleton")
@DisconfFile(filename = "redis.properties")
public class RedisConfig implements IDisconfUpdate {
    private static Logger logger = LoggerFactory.getLogger("RedisConfig");

    private String host;
    private String port;


    @DisconfFileItem(name = "redis.host", associateField = "host")
    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    @DisconfFileItem(name = "redis.port", associateField = "port")
    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }



    @Override
    public void reload() throws Exception {
        logger.info("redis.properties文件已重新加载");
    }
}
