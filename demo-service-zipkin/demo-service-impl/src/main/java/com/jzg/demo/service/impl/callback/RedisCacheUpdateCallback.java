package com.jzg.demo.service.impl.callback;

import com.baidu.disconf.client.common.annotations.DisconfUpdateService;
import com.baidu.disconf.client.common.update.IDisconfUpdate;
import com.jzg.framework.cache.redis.RedisCache;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

/**
 * Redis配置更新后，回调操作
 */
@Service
@Scope("singleton")
@DisconfUpdateService(confFileKeys = { "redis.properties" })
public class RedisCacheUpdateCallback implements IDisconfUpdate {

    private static Logger logger = LoggerFactory.getLogger(RedisCacheUpdateCallback.class);

    @Autowired
    private RedisCache redisCache;

    /**
     * 重新加载配置文件
     * @throws Exception
     */
    public void reload() throws Exception {
        logger.info("redis.properties文件已重新加载");
        redisCache.reload();
        logger.info("redis.properties初始化成功");
    }

    /**
     * 配置文件
     *
     * @param key
     * @param filePath
     * @throws Exception
     */
    /*@Override
    public void reloadDisconfFile(String key, String filePath) throws Exception {
        logger.info("key: "+ key + "  filePath:" + filePath + "  更新。。。");
    }*/

    /**
     * 配置项
     *
     * @param key
     * @param content
     * @throws Exception
     */
    /*@Override
    public void reloadDisconfItem(String key, Object content) throws Exception {
        logger.info("key: "+ key + "  content:" + content.toString() + "  更新。。。");
    }*/
}