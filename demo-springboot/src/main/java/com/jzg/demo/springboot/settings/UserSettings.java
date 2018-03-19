package com.jzg.demo.springboot.settings;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * @description: UserConfig
 * <p>
 *     常量配置加载
 * </p>
 * @author: JZG
 * @date: 2018/3/8 11:09
 * @version:
 */
@Component
@ConfigurationProperties(prefix = "user")
@PropertySource("classpath:/user.properties")
public class UserSettings {
    private String name;
    private String address;
    private String phone;

    /**
     * Getter for property 'name'.
     *
     * @return Value for property 'name'.
     */
    public String getName() {
        return name;
    }

    /**
     * Setter for property 'name'.
     *
     * @param name Value to set for property 'name'.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Getter for property 'address'.
     *
     * @return Value for property 'address'.
     */
    public String getAddress() {
        return address;
    }

    /**
     * Setter for property 'address'.
     *
     * @param address Value to set for property 'address'.
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * Getter for property 'phone'.
     *
     * @return Value for property 'phone'.
     */
    public String getPhone() {
        return phone;
    }

    /**
     * Setter for property 'phone'.
     *
     * @param phone Value to set for property 'phone'.
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }


    @Override
    public String toString() {
        return "UserSettings{" +
                "name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}
