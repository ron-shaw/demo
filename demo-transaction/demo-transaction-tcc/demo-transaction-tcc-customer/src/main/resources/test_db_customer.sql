/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : test_db_customer

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-03-06 14:44:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login_name` varchar(50) NOT NULL,
  `age` int(11) NOT NULL,
  `indate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES ('1', 'test1', '1', '2018-01-18 18:13:12');
INSERT INTO `customer` VALUES ('2', 'test2', '33', '2018-01-19 18:33:29');

-- ----------------------------
-- Table structure for customer_balance
-- ----------------------------
DROP TABLE IF EXISTS `customer_balance`;
CREATE TABLE `customer_balance` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customer_id` bigint(20) NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `valid_amount` decimal(12,2) NOT NULL,
  `frozen_amount` decimal(12,2) NOT NULL,
  `indate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of customer_balance
-- ----------------------------
INSERT INTO `customer_balance` VALUES ('1', '1', '300.00', '300.00', '0.00', '2018-01-18 18:13:21');
