-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2024-05-08 08:07:13
-- 服务器版本： 5.7.40
-- PHP 版本： 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `sdfgfhgjkl`
--

-- --------------------------------------------------------

--
-- 表的结构 `ev_todo`
--

DROP TABLE IF EXISTS `ev_todo`;
CREATE TABLE IF NOT EXISTS `ev_todo` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `todo` varchar(255) NOT NULL COMMENT '要做的事',
  `finishi` int(2) NOT NULL DEFAULT '0' COMMENT '完成',
  `upcoming` int(2) NOT NULL DEFAULT '0' COMMENT '代办',
  `is_delete` int(2) NOT NULL DEFAULT '0' COMMENT '是否删除',
  `time` varchar(255) NOT NULL COMMENT '操作时间',
  `ftime` varchar(255) DEFAULT NULL COMMENT '完成时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户办事表';

-- --------------------------------------------------------

--
-- 表的结构 `ev_users`
--

DROP TABLE IF EXISTS `ev_users`;
CREATE TABLE IF NOT EXISTS `ev_users` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `pic` varchar(255) NOT NULL COMMENT '用户头像',
  `password` varchar(255) NOT NULL COMMENT '用户密码',
  `upload` int(11) NOT NULL DEFAULT '0' COMMENT '是否上传云端',
  `toChange` int(1) NOT NULL DEFAULT '0' COMMENT '是否更改',
  `state` int(1) NOT NULL DEFAULT '0' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='用户信息表';

--
-- 转存表中的数据 `ev_users`
--

INSERT INTO `ev_users` (`id`, `username`, `pic`, `password`, `upload`, `toChange`, `state`) VALUES
(1, 'admin', '', '$2a$10$09lvtkvWzAq8KiWCvNC9Eei3/jF8YAOUKLTIgSxl.LlgrDncklQTq', 1, 1, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
