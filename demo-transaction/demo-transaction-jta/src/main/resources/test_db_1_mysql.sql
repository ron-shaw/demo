/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : test_db_1

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-03-01 14:42:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(50) NOT NULL,
  `customer_id` bigint(20) NOT NULL,
  `indate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('1', '测试商品', '1', '2018-01-18 18:08:57');
INSERT INTO `product` VALUES ('2', 'test_product_meksP', '1', '2018-01-22 17:59:02');
INSERT INTO `product` VALUES ('3', '测试商品JHubY', '1', '2018-01-19 16:12:34');
INSERT INTO `product` VALUES ('4', '测试商品_xlWjj', '1', '2018-01-19 17:23:14');
INSERT INTO `product` VALUES ('5', 'test_23654', '2', '2018-01-19 19:26:55');
INSERT INTO `product` VALUES ('6', '测试_23654', '2', '2018-01-19 19:27:05');
INSERT INTO `product` VALUES ('7', '测试商品_VYgAC', '1', '2018-01-22 11:14:29');
INSERT INTO `product` VALUES ('8', '测试商品_5VRxf', '1', '2018-01-22 11:14:29');
INSERT INTO `product` VALUES ('9', '测试商品_jLKgX', '1', '2018-01-22 11:16:54');
INSERT INTO `product` VALUES ('10', '测试商品_KBnnF', '1', '2018-01-22 11:16:54');
INSERT INTO `product` VALUES ('11', '测试商品_5m8ka', '1', '2018-01-22 11:48:07');
INSERT INTO `product` VALUES ('12', '测试商品_Wv1cF', '1', '2018-01-22 11:48:07');
INSERT INTO `product` VALUES ('13', '测试商品_uxROT', '1', '2018-01-22 11:51:19');
INSERT INTO `product` VALUES ('15', '测试商品_CA6cG', '1', '2018-01-22 11:59:46');
INSERT INTO `product` VALUES ('16', 'test_12353', '1', '2018-01-22 12:01:20');
INSERT INTO `product` VALUES ('17', '测试商品_EbVVL', '1', '2018-01-22 13:13:20');
INSERT INTO `product` VALUES ('18', '测试商品_iA7Ft', '1', '2018-01-22 13:14:22');
INSERT INTO `product` VALUES ('19', '测试商品_PI5Ny', '1', '2018-01-22 13:14:44');
INSERT INTO `product` VALUES ('20', '测试商品_eT11C', '1', '2018-01-22 13:15:05');
INSERT INTO `product` VALUES ('21', '测试商品eOWUx', '3', '2018-01-22 15:27:01');
INSERT INTO `product` VALUES ('22', '测试商品_s6yXG', '1', '2018-01-22 17:56:55');
INSERT INTO `product` VALUES ('23', '测试商品_Et3ve', '1', '2018-01-22 17:56:55');

-- ----------------------------
-- Table structure for stock
-- ----------------------------
DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `indate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of stock
-- ----------------------------
INSERT INTO `stock` VALUES ('1', '60', '1', '2018-01-18 18:09:11');
