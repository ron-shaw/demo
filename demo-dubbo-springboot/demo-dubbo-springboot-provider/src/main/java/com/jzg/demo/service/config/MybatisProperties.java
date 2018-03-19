package com.jzg.demo.service.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @description: MyBatisPropeirtoes
 * @author: JZG
 * @date: 2018/3/19 11:16
 * @version:
 */
@Component
@ConfigurationProperties(prefix = MybatisProperties.TK_MYBATIS_PREFIX)
public class MybatisProperties {
    public static final String TK_MYBATIS_PREFIX = "tk.mybatis";

    private static final Logger LOGGER = LoggerFactory.getLogger(MybatisMapperAutoConfiguration.class);



    private List<Class> mappers = new ArrayList<Class>();

    private String basePackage;

    private String markerInterface;

    private String[] mapperLocations;

    private String typeAliasesPackage;

    /**
     * Getter for property 'mappers'.
     *
     * @return Value for property 'mappers'.
     */
    public List<Class> getMappers() {
        return mappers;
    }

    /**
     * Getter for property 'basePackage'.
     *
     * @return Value for property 'basePackage'.
     */
    public String getBasePackage() {
        return basePackage;
    }

    /**
     * Getter for property 'markerInterface'.
     *
     * @return Value for property 'markerInterface'.
     */
    public String getMarkerInterface() {
        return markerInterface;
    }

    /**
     * Getter for property 'mapperLocations'.
     *
     * @return Value for property 'mapperLocations'.
     */
    public String[] getMapperLocations() {
        return mapperLocations;
    }

    /**
     * Getter for property 'typeAliasesPackage'.
     *
     * @return Value for property 'typeAliasesPackage'.
     */
    public String getTypeAliasesPackage() {
        return typeAliasesPackage;
    }

    public Resource[] resolveMapperLocations() {
        ResourcePatternResolver resourceResolver = new PathMatchingResourcePatternResolver();
        List<Resource> resources = new ArrayList<Resource>();
        if (this.mapperLocations != null) {
            for (String mapperLocation : this.mapperLocations) {
                try {
                    Resource[] mappers = resourceResolver.getResources(mapperLocation);
                    resources.addAll(Arrays.asList(mappers));
                } catch (IOException e) {
                    LOGGER.error(e.getMessage(), e);
                }
            }
        }
        return resources.toArray(new Resource[resources.size()]);
    }
}
