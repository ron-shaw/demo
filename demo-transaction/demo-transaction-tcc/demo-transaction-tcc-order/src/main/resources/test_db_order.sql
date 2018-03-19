/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : test_db_order

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-03-06 16:08:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` bigint(20) NOT NULL,
  `customer_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `indate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('1', '100', '1', '100.00', '2018-01-18 17:43:54');
INSERT INTO `order` VALUES ('2', '100', '1', '100.00', '2018-01-18 17:52:35');
INSERT INTO `order` VALUES ('3', '100', '1', '100.00', '2018-01-18 17:59:46');
INSERT INTO `order` VALUES ('11', '1', '1', '100.00', '2018-01-18 20:07:16');
INSERT INTO `order` VALUES ('12', '1', '1', '10.00', '2018-01-19 14:10:56');
INSERT INTO `order` VALUES ('13', '1', '1', '10.00', '2018-01-19 14:10:56');
INSERT INTO `order` VALUES ('14', '1', '1', '10.00', '2018-01-19 14:10:56');
INSERT INTO `order` VALUES ('15', '1', '1', '10.00', '2018-01-19 14:10:56');
INSERT INTO `order` VALUES ('16', '1', '1', '10.00', '2018-01-19 14:10:56');
INSERT INTO `order` VALUES ('19', '1', '1', '10.00', '2018-01-22 17:56:56');
INSERT INTO `order` VALUES ('20', '1', '1', '10.00', '2018-01-22 17:56:56');
INSERT INTO `order` VALUES ('21', '1', '1', '10.00', '2018-01-22 17:56:56');
INSERT INTO `order` VALUES ('22', '1', '1', '10.00', '2018-01-22 17:56:57');
INSERT INTO `order` VALUES ('23', '1', '1', '10.00', '2018-01-22 17:56:57');
INSERT INTO `order` VALUES ('25', '1', '1', '10.00', '2018-01-22 17:59:02');
INSERT INTO `order` VALUES ('26', '1', '1', '10.00', '2018-01-22 17:59:02');
INSERT INTO `order` VALUES ('27', '1', '1', '10.00', '2018-01-22 17:59:02');
INSERT INTO `order` VALUES ('28', '1', '1', '10.00', '2018-01-22 17:59:02');
INSERT INTO `order` VALUES ('29', '1', '1', '10.00', '2018-01-22 17:59:02');
