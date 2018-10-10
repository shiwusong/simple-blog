/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : go2web

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-09-28 14:37:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for catalog
-- ----------------------------
DROP TABLE IF EXISTS `catalog`;
CREATE TABLE `catalog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `upId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `index` int(11) DEFAULT '0' COMMENT '排序级别，数字越小越排在前面',
  `name` varchar(255) DEFAULT NULL,
  `abstract` varchar(255) DEFAULT NULL COMMENT '简介',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` int(3) DEFAULT '1' COMMENT '1:正常 0:删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of catalog
-- ----------------------------
INSERT INTO `catalog` VALUES ('0', '-1', '0', '0', 'root', 'root', '2018-09-15 20:40:32', '2018-09-15 20:40:32', '1');
INSERT INTO `catalog` VALUES ('2', '0', '0', '0', 'JAVA基础', '这是一个测试目录', '2018-09-15 20:41:21', '2018-09-15 20:41:21', '1');
INSERT INTO `catalog` VALUES ('3', '0', '0', '1', 'C#基础', '这是一个测试目录', '2018-09-15 20:42:02', '2018-09-15 20:42:02', '1');
INSERT INTO `catalog` VALUES ('4', '0', '0', '2', 'css基础', '这是一个测试目录', '2018-09-15 20:42:21', '2018-09-15 20:42:21', '1');
INSERT INTO `catalog` VALUES ('5', '0', '0', '3', 'JS基础', '这是一个测试目录', '2018-09-15 20:42:38', '2018-09-15 20:42:38', '1');
INSERT INTO `catalog` VALUES ('6', '2', '0', '0', '变量', '变量是编程里面最小的操作单位', '2018-09-15 20:47:12', '2018-09-15 20:47:12', '1');
INSERT INTO `catalog` VALUES ('7', '2', '0', '1', '判断', '没有判断，程序就跑不起来', '2018-09-15 20:47:47', '2018-09-15 20:47:47', '1');
INSERT INTO `catalog` VALUES ('8', '2', '0', '2', '循环', '循环是重点', '2018-09-15 20:48:08', '2018-09-15 20:48:08', '1');
INSERT INTO `catalog` VALUES ('9', '2', '0', '3', '数组', '数组将方便你存储数据', '2018-09-15 20:48:34', '2018-09-15 20:48:34', '1');
INSERT INTO `catalog` VALUES ('10', '3', '0', '0', 'c#委托', '一个解决线程调用ui的方案', '2018-09-15 20:49:36', '2018-09-15 20:49:36', '1');
INSERT INTO `catalog` VALUES ('11', '4', '0', '0', '布局', 'float很强大', '2018-09-15 20:49:55', '2018-09-15 20:49:55', '1');
INSERT INTO `catalog` VALUES ('12', '5', '0', '0', '闭包', '你知道js头上的包吗？', '2018-09-15 20:50:16', '2018-09-15 20:50:16', '1');

-- ----------------------------
-- Table structure for commenta
-- ----------------------------
DROP TABLE IF EXISTS `commenta`;
CREATE TABLE `commenta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL COMMENT '评论表Id',
  `commentQId` int(11) DEFAULT NULL,
  `info` text COMMENT '评论内容',
  `code` text COMMENT '代码内容',
  `codeType` varchar(255) DEFAULT 'javascript' COMMENT '代码类型',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of commenta
-- ----------------------------
INSERT INTO `commenta` VALUES ('1', '0', '石悟松', '2', '哇嘎嘎嘎', null, 'javascript', '2018-09-21 12:52:34');
INSERT INTO `commenta` VALUES ('2', '0', '石悟松', '4', '哈哈哈', '', 'javascript', '2018-09-26 22:49:23');
INSERT INTO `commenta` VALUES ('3', '0', '石悟松', '4', '111', '123', 'javascript', '2018-09-26 22:49:39');
INSERT INTO `commenta` VALUES ('4', '0', '石悟松', '4', '123', '', 'javascript', '2018-09-27 22:34:45');
INSERT INTO `commenta` VALUES ('5', '0', '石悟松', '4', '和你说话呢', '', 'javascript', '2018-09-27 22:36:35');
INSERT INTO `commenta` VALUES ('6', '0', '石悟松', '4', '好了吗', '', 'javascript', '2018-09-27 22:38:26');
INSERT INTO `commenta` VALUES ('7', '0', '石悟松', '4', '够了你', '', 'javascript', '2018-09-27 22:39:21');
INSERT INTO `commenta` VALUES ('8', '0', '石悟松', '4', '奇怪', '', 'javascript', '2018-09-27 22:40:22');
INSERT INTO `commenta` VALUES ('9', '0', '石悟松', '4', '哈哈哈嗯', '', 'javascript', '2018-09-27 23:19:14');
INSERT INTO `commenta` VALUES ('10', '0', '石悟松', '3', '第二个测试', '', 'javascript', '2018-09-27 23:19:47');
INSERT INTO `commenta` VALUES ('11', '0', '石悟松', '3', '测试', '', 'javascript', '2018-09-27 23:20:35');
INSERT INTO `commenta` VALUES ('12', '0', '石悟松', '3', '嗯嗯', '', 'javascript', '2018-09-27 23:21:35');
INSERT INTO `commenta` VALUES ('13', '0', '石悟松', '3', '嗯嗯', '', 'javascript', '2018-09-27 23:22:52');
INSERT INTO `commenta` VALUES ('14', '0', '石悟松', '3', '爱上帝', '', 'javascript', '2018-09-27 23:24:02');
INSERT INTO `commenta` VALUES ('15', '0', '石悟松', '2', '嘎嘎嘎', '', 'javascript', '2018-09-27 23:24:46');

-- ----------------------------
-- Table structure for commentq
-- ----------------------------
DROP TABLE IF EXISTS `commentq`;
CREATE TABLE `commentq` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `mdId` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL COMMENT '问题的简要说明',
  `info` text COMMENT '评论内容',
  `code` text COMMENT '代码',
  `codeType` varchar(255) DEFAULT 'javascript' COMMENT '代码类型',
  `imgPath` varchar(255) DEFAULT NULL COMMENT '截图路径',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of commentq
-- ----------------------------
INSERT INTO `commentq` VALUES ('1', '0', '石悟松', '2', null, '这是一份描述', 'let i = 1;\nlet info = \'test\';', 'javascript', '\\public\\uploadImg\\201809\\201809211658.png', '2018-09-21 02:57:47');
INSERT INTO `commentq` VALUES ('2', '0', '石悟松', '2', null, '这是一份描述', 'let i = 1;\nlet info = \'test\';', 'javascript', '\\public\\uploadImg\\201809\\201809211658.png', '2018-09-21 02:59:59');
INSERT INTO `commentq` VALUES ('3', '0', '石悟松', '2', null, '这是一份描述', 'let i = 1;\nlet info = \'test\';', 'javascript', '\\public\\uploadImg\\201809\\201809211782.jpg', '2018-09-21 03:00:18');
INSERT INTO `commentq` VALUES ('4', '0', '石悟松', '2', null, '这是一份描述', 'let i = 1;\nlet info = \'test\';', 'javascript', '\\public\\uploadImg\\201809\\201809211782.jpg', '2018-09-21 03:00:20');

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL COMMENT '文件类型',
  `filename` varchar(255) DEFAULT NULL,
  `size` int(15) DEFAULT '0' COMMENT '文件大小',
  `dirpath` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT '1' COMMENT '状态 1:正常 0:删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES ('14', '6', 'IMG', '201809171276.jpg', '0', '201809', '2018-09-17 01:49:25', '1');
INSERT INTO `file` VALUES ('15', '6', 'IMG', '201809171965.jpg', '0', '201809', '2018-09-17 01:49:29', '1');
INSERT INTO `file` VALUES ('16', '6', 'IMG', '201809171798.png', '0', '201809', '2018-09-17 01:49:42', '1');
INSERT INTO `file` VALUES ('17', '6', 'IMG', '201809171988.jpg', '0', '201809', '2018-09-17 01:49:46', '1');
INSERT INTO `file` VALUES ('18', '6', 'IMG', '201809171787.jpg', '0', '201809', '2018-09-17 01:49:51', '1');
INSERT INTO `file` VALUES ('19', '6', 'IMG', '201809171209.jpg', '0', '201809', '2018-09-17 01:49:55', '1');
INSERT INTO `file` VALUES ('20', '0', 'IMG', '201809211879.png', '0', '201809', '2018-09-21 02:40:43', '1');
INSERT INTO `file` VALUES ('21', '0', 'IMG', '201809211677.jpg', '0', '201809', '2018-09-21 02:44:25', '1');
INSERT INTO `file` VALUES ('22', '0', 'IMG', '201809211658.png', '0', '201809', '2018-09-21 02:57:20', '1');
INSERT INTO `file` VALUES ('23', '0', 'IMG', '201809211782.jpg', '0', '201809', '2018-09-21 03:00:17', '1');
INSERT INTO `file` VALUES ('24', '0', 'FILE', '2015_03_20-23_27_35-0254-step5.tif', '0', '201809', '2018-09-28 11:41:18', '1');
INSERT INTO `file` VALUES ('25', '0', 'FILE', '002.tif', '0', '201809', '2018-09-28 11:46:24', '1');
INSERT INTO `file` VALUES ('26', '0', 'FILE', '_1.jpg', '0', '201809', '2018-09-28 11:47:09', '1');
INSERT INTO `file` VALUES ('27', '0', 'FILE', '_2.jpg', '0', '201809', '2018-09-28 11:50:43', '1');
INSERT INTO `file` VALUES ('28', '0', 'FILE', '_1.jpg', '0', '201809', '2018-09-28 11:51:35', '1');
INSERT INTO `file` VALUES ('29', '0', 'FILE', '003.tif', '0', '201809', '2018-09-28 12:03:01', '1');
INSERT INTO `file` VALUES ('30', '0', 'FILE', '_1.jpg', '0', '201809', '2018-09-28 12:07:54', '1');
INSERT INTO `file` VALUES ('31', '0', 'FILE', '001.tif', '4214856', '201809', '2018-09-28 12:10:53', '1');

-- ----------------------------
-- Table structure for md
-- ----------------------------
DROP TABLE IF EXISTS `md`;
CREATE TABLE `md` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `catalogId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `index` int(11) DEFAULT '0',
  `isSell` tinyint(1) DEFAULT '0' COMMENT '是否收费 0：不收费 1：收费',
  `sellNum` float DEFAULT '0',
  `md` text,
  `html` text,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `visiteCount` int(11) DEFAULT '0' COMMENT '访问人数',
  `status` int(3) DEFAULT '1' COMMENT '1:正常 0:删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of md
-- ----------------------------
INSERT INTO `md` VALUES ('1', '6', '0', '测试', '4', '0', '0', '# LSTM_generation\n这是一个`keras`中`LSTM`的入门实例。\n\n## 1.文件结构\n* train_data\n  * new_wangfeng.txt\n  * preprocessing.py\n  * wangfeng.txt\n* generation\n* main.py\n* weights-improvement=26-0.105659.hdf5（[百度网盘](https://pan.baidu.com/s/1eT3fTWQ)）\n\n<img src=\"/public/uploadImg/201809/201809171209.jpg\" style=\"height:500px;width:500px;\" alt=\"\"/>\n1. train_data文件夹下是用作训练的数据，wangfeng.txt是原始数据，\n   preprocessing.py是很简单的文本预处理，new_wangfeng.txt是真  \n   正的训练数据\n2. generation.py是生成脚本，用来生成歌词。(可直接运行)\n3. main.py是训练脚本\n4. weights-improvement=26-0.105659.hdf5是训练好的网络（28代左右，训练了12个小时）\n \n \n## 2.网络结构\n此实例基于keras，网络构建十分简单。\n```python\nmodel.add(Embedding(n_vocab, 512, input_length=seq_length))\nmodel.add(LSTM(512, input_shape=(seq_length, 512), return_sequences=True))\nmodel.add(LSTM(1024))\nmodel.add(Dense(n_vocab, activation=\'softmax\'))\n```\n\n## 3.实验结果\n将代码clone下来后，直接运行main.py开始训练。\n如果觉得训练时间太长，可以下载已训练好的[网络](https://pan.baidu.com/s/1eT3fTWQ),放置同级目录下  \n然后直接运行generation.py(脚本里面加载的网络文件名称要统一)会出现如下结果：  \n![image](result.png)\n\n## 4.作者联系方式\n邮箱：651010646@qq.com  \n欢迎讨论，共同学习。\'\n\n', null, '2018-09-19 15:05:28', '2018-09-19 15:05:28', '0', '1');
INSERT INTO `md` VALUES ('2', '6', '0', '测试', '4', '0', '0', '# LSTM_generation\n这是一个`keras`中`LSTM`的入门实例。\n\n## 1.文件结构\n* train_data\n  * new_wangfeng.txt\n  * preprocessing.py\n  * wangfeng.txt\n* generation\n* main.py\n* weights-improvement=26-0.105659.hdf5（[百度网盘](https://pan.baidu.com/s/1eT3fTWQ)）\n\n<img src=\"/public/uploadImg/201809/201809171209.jpg\" style=\"height:500px;width:500px;\" alt=\"\"/>\n1. train_data文件夹下是用作训练的数据，wangfeng.txt是原始数据，\n   preprocessing.py是很简单的文本预处理，new_wangfeng.txt是真  \n   正的训练数据\n2. generation.py是生成脚本，用来生成歌词。(可直接运行)\n3. main.py是训练脚本\n4. weights-improvement=26-0.105659.hdf5是训练好的网络（28代左右，训练了12个小时）\n \n \n## 2.网络结构\n此实例基于keras，网络构建十分简单。\n```python\nmodel.add(Embedding(n_vocab, 512, input_length=seq_length))\nmodel.add(LSTM(512, input_shape=(seq_length, 512), return_sequences=True))\nmodel.add(LSTM(1024))\nmodel.add(Dense(n_vocab, activation=\'softmax\'))\n```\n\n## 3.实验结果\n将代码clone下来后，直接运行main.py开始训练。\n如果觉得训练时间太长，可以下载已训练好的[网络](https://pan.baidu.com/s/1eT3fTWQ),放置同级目录下  \n然后直接运行generation.py(脚本里面加载的网络文件名称要统一)会出现如下结果：  \n![image](result.png)\n\n## 4.作者联系方式\n邮箱：651010646@qq.com  \n欢迎讨论，共同学习。\'\n\n', '<h1 id=\"lstm_generation\">LSTM_generation</h1>\n<p>这是一个<code>keras</code>中<code>LSTM</code>的入门实例。</p>\n<h2 id=\"1-\">1.文件结构</h2>\n<ul>\n<li>train_data<ul>\n<li>new_wangfeng.txt</li>\n<li>preprocessing.py</li>\n<li>wangfeng.txt</li>\n</ul>\n</li>\n<li>generation</li>\n<li>main.py</li>\n<li>weights-improvement=26-0.105659.hdf5（<a href=\"https://pan.baidu.com/s/1eT3fTWQ\">百度网盘</a>）</li>\n</ul>\n<img src=\"/public/uploadImg/201809/201809171209.jpg\" style=\"height:500px;width:500px;\" alt=\"\"/>\n1. train_data文件夹下是用作训练的数据，wangfeng.txt是原始数据，\n   preprocessing.py是很简单的文本预处理，new_wangfeng.txt是真  \n   正的训练数据\n2. generation.py是生成脚本，用来生成歌词。(可直接运行)\n3. main.py是训练脚本\n4. weights-improvement=26-0.105659.hdf5是训练好的网络（28代左右，训练了12个小时）\n\n\n<h2 id=\"2-\">2.网络结构</h2>\n<p>此实例基于keras，网络构建十分简单。</p>\n<pre><code class=\"language-python\">model.add(Embedding(n_vocab, 512, input_length=seq_length))\nmodel.add(LSTM(512, input_shape=(seq_length, 512), return_sequences=True))\nmodel.add(LSTM(1024))\nmodel.add(Dense(n_vocab, activation=&#39;softmax&#39;))</code></pre>\n<h2 id=\"3-\">3.实验结果</h2>\n<p>将代码clone下来后，直接运行main.py开始训练。<br>如果觉得训练时间太长，可以下载已训练好的<a href=\"https://pan.baidu.com/s/1eT3fTWQ\">网络</a>,放置同级目录下<br>然后直接运行generation.py(脚本里面加载的网络文件名称要统一)会出现如下结果：<br><img src=\"result.png\" alt=\"image\"></p>\n<h2 id=\"4-\">4.作者联系方式</h2>\n<p>邮箱：<a href=\"mailto:651010646@qq.com\">651010646@qq.com</a><br>欢迎讨论，共同学习。&#39;</p>\n', '2018-09-19 15:06:12', '2018-09-19 15:06:12', '0', '1');
INSERT INTO `md` VALUES ('3', '6', '0', '测试2', '4', '0', '0', '# LSTM_generation\n这是一个`keras`中`LSTM`的入门实例。\n\n## 1.文件结构\n* train_data\n  * new_wangfeng.txt\n  * preprocessing.py\n  * wangfeng.txt\n* generation\n* main.py\n* weights-improvement=26-0.105659.hdf5（[百度网盘](https://pan.baidu.com/s/1eT3fTWQ)）\n\n<img src=\"/public/uploadImg/201809/201809171209.jpg\" style=\"height:500px;width:500px;\" alt=\"\"/>\n1. train_data文件夹下是用作训练的数据，wangfeng.txt是原始数据，\n   preprocessing.py是很简单的文本预处理，new_wangfeng.txt是真  \n   正的训练数据\n2. generation.py是生成脚本，用来生成歌词。(可直接运行)\n3. main.py是训练脚本\n4. weights-improvement=26-0.105659.hdf5是训练好的网络（28代左右，训练了12个小时）\n \n \n## 2.网络结构\n此实例基于keras，网络构建十分简单。\n```python\nmodel.add(Embedding(n_vocab, 512, input_length=seq_length))\nmodel.add(LSTM(512, input_shape=(seq_length, 512), return_sequences=True))\nmodel.add(LSTM(1024))\nmodel.add(Dense(n_vocab, activation=\'softmax\'))\n```\n\n## 3.实验结果\n将代码clone下来后，直接运行main.py开始训练。\n如果觉得训练时间太长，可以下载已训练好的[网络](https://pan.baidu.com/s/1eT3fTWQ),放置同级目录下  \n然后直接运行generation.py(脚本里面加载的网络文件名称要统一)会出现如下结果：  \n![image](result.png)\n\n## 4.作者联系方式\n邮箱：651010646@qq.com  \n欢迎讨论，共同学习。\'\n\n', '<h1 id=\"lstm_generation\">LSTM_generation</h1>\n<p>这是一个<code>keras</code>中<code>LSTM</code>的入门实例。</p>\n<h2 id=\"1-\">1.文件结构</h2>\n<ul>\n<li>train_data<ul>\n<li>new_wangfeng.txt</li>\n<li>preprocessing.py</li>\n<li>wangfeng.txt</li>\n</ul>\n</li>\n<li>generation</li>\n<li>main.py</li>\n<li>weights-improvement=26-0.105659.hdf5（<a href=\"https://pan.baidu.com/s/1eT3fTWQ\">百度网盘</a>）</li>\n</ul>\n<img src=\"/public/uploadImg/201809/201809171209.jpg\" style=\"height:500px;width:500px;\" alt=\"\"/>\n1. train_data文件夹下是用作训练的数据，wangfeng.txt是原始数据，\n   preprocessing.py是很简单的文本预处理，new_wangfeng.txt是真  \n   正的训练数据\n2. generation.py是生成脚本，用来生成歌词。(可直接运行)\n3. main.py是训练脚本\n4. weights-improvement=26-0.105659.hdf5是训练好的网络（28代左右，训练了12个小时）\n\n\n<h2 id=\"2-\">2.网络结构</h2>\n<p>此实例基于keras，网络构建十分简单。</p>\n<pre><code class=\"language-python\">model.add(Embedding(n_vocab, 512, input_length=seq_length))\nmodel.add(LSTM(512, input_shape=(seq_length, 512), return_sequences=True))\nmodel.add(LSTM(1024))\nmodel.add(Dense(n_vocab, activation=&#39;softmax&#39;))</code></pre>\n<h2 id=\"3-\">3.实验结果</h2>\n<p>将代码clone下来后，直接运行main.py开始训练。<br>如果觉得训练时间太长，可以下载已训练好的<a href=\"https://pan.baidu.com/s/1eT3fTWQ\">网络</a>,放置同级目录下<br>然后直接运行generation.py(脚本里面加载的网络文件名称要统一)会出现如下结果：<br><img src=\"result.png\" alt=\"image\"></p>\n<h2 id=\"4-\">4.作者联系方式</h2>\n<p>邮箱：<a href=\"mailto:651010646@qq.com\">651010646@qq.com</a><br>欢迎讨论，共同学习。&#39;</p>\n', '2018-09-19 15:08:16', '2018-09-19 15:08:16', '0', '1');

-- ----------------------------
-- Table structure for salary
-- ----------------------------
DROP TABLE IF EXISTS `salary`;
CREATE TABLE `salary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `payId` varchar(255) DEFAULT NULL,
  `payType` varchar(255) DEFAULT NULL,
  `count` float DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL COMMENT '交易方式：充值，购买',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of salary
-- ----------------------------

-- ----------------------------
-- Table structure for tmd
-- ----------------------------
DROP TABLE IF EXISTS `tmd`;
CREATE TABLE `tmd` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mdId` int(11) DEFAULT NULL COMMENT '是否是更改',
  `userId` int(11) DEFAULT NULL,
  `md` text,
  `html` text,
  `saveTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tmd
-- ----------------------------
INSERT INTO `tmd` VALUES ('2', null, '1', '123', null, '2018-09-14 17:23:10');
INSERT INTO `tmd` VALUES ('3', null, '1', '222', '333', '2018-09-14 17:38:35');
INSERT INTO `tmd` VALUES ('4', null, '1', '333', '333', '2018-09-14 17:38:42');
INSERT INTO `tmd` VALUES ('5', null, '1', '123', '4', '2018-09-17 11:52:52');
INSERT INTO `tmd` VALUES ('6', null, '6', '# LSTM_generation\n这是一个`keras`中`LSTM`的入门实例。\n\n## 1.文件结构\n* train_data\n  * new_wangfeng.txt\n  * preprocessing.py\n  * wangfeng.txt\n* generation\n* main.py\n* weights-improvement=26-0.105659.hdf5（[百度网盘](https://pan.baidu.com/s/1eT3fTWQ)）\n\n<img src=\"/public/uploadImg/201809/201809171209.jpg\" style=\"height:500px;width:500px;\" alt=\"\"/>\n1. train_data文件夹下是用作训练的数据，wangfeng.txt是原始数据，\n   preprocessing.py是很简单的文本预处理，new_wangfeng.txt是真  \n   正的训练数据\n2. generation.py是生成脚本，用来生成歌词。(可直接运行)\n3. main.py是训练脚本\n4. weights-improvement=26-0.105659.hdf5是训练好的网络（28代左右，训练了12个小时）\n \n \n## 2.网络结构\n此实例基于keras，网络构建十分简单。\n```python\nmodel.add(Embedding(n_vocab, 512, input_length=seq_length))\nmodel.add(LSTM(512, input_shape=(seq_length, 512), return_sequences=True))\nmodel.add(LSTM(1024))\nmodel.add(Dense(n_vocab, activation=\'softmax\'))\n```\n\n## 3.实验结果\n将代码clone下来后，直接运行main.py开始训练。\n如果觉得训练时间太长，可以下载已训练好的[网络](https://pan.baidu.com/s/1eT3fTWQ),放置同级目录下  \n然后直接运行generation.py(脚本里面加载的网络文件名称要统一)会出现如下结果：  \n![image](result.png)\n\n## 4.作者联系方式\n邮箱：651010646@qq.com  \n欢迎讨论，共同学习。\'\n\n', '<h1 id=\"lstm_generation\">LSTM_generation</h1>\n<p>这是一个<code>keras</code>中<code>LSTM</code>的入门实例。</p>\n<h2 id=\"1-\">1.文件结构</h2>\n<ul>\n<li>train_data<ul>\n<li>new_wangfeng.txt</li>\n<li>preprocessing.py</li>\n<li>wangfeng.txt</li>\n</ul>\n</li>\n<li>generation</li>\n<li>main.py</li>\n<li>weights-improvement=26-0.105659.hdf5（<a href=\"https://pan.baidu.com/s/1eT3fTWQ\">百度网盘</a>）</li>\n</ul>\n<img src=\"/public/uploadImg/201809/201809171209.jpg\" style=\"height:500px;width:500px;\" alt=\"\"/>\n1. train_data文件夹下是用作训练的数据，wangfeng.txt是原始数据，\n   preprocessing.py是很简单的文本预处理，new_wangfeng.txt是真  \n   正的训练数据\n2. generation.py是生成脚本，用来生成歌词。(可直接运行)\n3. main.py是训练脚本\n4. weights-improvement=26-0.105659.hdf5是训练好的网络（28代左右，训练了12个小时）\n\n\n<h2 id=\"2-\">2.网络结构</h2>\n<p>此实例基于keras，网络构建十分简单。</p>\n<pre><code class=\"language-python\">model.add(Embedding(n_vocab, 512, input_length=seq_length))\nmodel.add(LSTM(512, input_shape=(seq_length, 512), return_sequences=True))\nmodel.add(LSTM(1024))\nmodel.add(Dense(n_vocab, activation=&#39;softmax&#39;))</code></pre>\n<h2 id=\"3-\">3.实验结果</h2>\n<p>将代码clone下来后，直接运行main.py开始训练。<br>如果觉得训练时间太长，可以下载已训练好的<a href=\"https://pan.baidu.com/s/1eT3fTWQ\">网络</a>,放置同级目录下<br>然后直接运行generation.py(脚本里面加载的网络文件名称要统一)会出现如下结果：<br><img src=\"result.png\" alt=\"image\"></p>\n<h2 id=\"4-\">4.作者联系方式</h2>\n<p>邮箱：<a href=\"mailto:651010646@qq.com\">651010646@qq.com</a><br>欢迎讨论，共同学习。&#39;</p>\n', '2018-09-17 12:18:25');
INSERT INTO `tmd` VALUES ('7', null, '0', '<div class=\"mdFile_wrap\">\n  <h2 class=\"h\">相关下载</h1>\n  <hr class=\"hr\"/>\n  <div class=\"bb\">\n    <div class=\"span\">文件名</div>\n    <div class=\"span\">文件大小</div>\n  </div>\n  <div class=\"bb\">\n    <div class=\"span\">\n      <a href=\"/public/uploadFile/201809/001.tif\">\n      <img class=\"img\" src=\"/images/下载.png\" alt=\"上传\"/>\n        001.tif\n      </a>\n    </div>\n    <div class=\"span\">0MB</div>\n  </div>\n</div>\n\n\n\n\n\n\n# LSTM_generation\n这是一个`keras`中`LSTM`的入门实例。\n\n## 1.文件结构\n* train_data\n  * new_wangfeng.txt\n  * preprocessing.py\n  * wangfeng.txt\n* generation\n* main.py\n* weights-improvement=26-0.105659.hdf5（[百度网盘](https://pan.baidu.com/s/1eT3fTWQ)）\n111222\n<img src=\"/public/uploadFile/201809/_2.jpg\" style=\"height:500px;width:500px;\" alt=\"\"/>\n<img src=\"/public/uploadImg/201809/201809171209.jpg\" style=\"height:500px;width:500px;\" alt=\"\"/>\n\n1. train_data文件夹下是用作训练的数据，wangfeng.txt是原始数据，\n   preprocessing.py是很简单的文本预处理，new_wangfeng.txt是真  \n   正的训练数据\n2. generation.py是生成脚本，用来生成歌词。(可直接运行)\n3. main.py是训练脚本\n4. weights-improvement=26-0.105659.hdf5是训练好的网络（28代左右，训练了12个小时）\n \n \n## 2.网络结构\n此实例基于keras，网络构建十分简单。\n```python\nmodel.add(Embedding(n_vocab, 512, input_length=seq_length))\nmodel.add(LSTM(512, input_shape=(seq_length, 512), return_sequences=True))\nmodel.add(LSTM(1024))\nmodel.add(Dense(n_vocab, activation=\'softmax\'))\n```\n\n## 3.实验结果\n将代码clone下来后，直接运行main.py开始训练。\n如果觉得训练时间太长，可以下载已训练好的[网络](https://pan.baidu.com/s/1eT3fTWQ),放置同级目录下  \n然后直接运行generation.py(脚本里面加载的网络文件名称要统一)会出现如下结果：  \n![image](result.png)\n\n## 4.作者联系方式\n邮箱：651010646@qq.com  \n欢迎讨论，共同学习。\'\n\n', '<div class=\"mdFile_wrap\">\n  <h2 class=\"h\">相关下载</h1>\n  <hr class=\"hr\"/>\n  <div class=\"bb\">\n    <div class=\"span\">文件名</div>\n    <div class=\"span\">文件大小</div>\n  </div>\n  <div class=\"bb\">\n    <div class=\"span\">\n      <a href=\"/public/uploadFile/201809/001.tif\">\n      <img class=\"img\" src=\"/images/下载.png\" alt=\"上传\"/>\n        001.tif\n      </a>\n    </div>\n    <div class=\"span\">0MB</div>\n  </div>\n</div>\n\n\n\n\n\n\n<h1 id=\"lstm_generation\">LSTM_generation</h1>\n<p>这是一个<code>keras</code>中<code>LSTM</code>的入门实例。</p>\n<h2 id=\"1-\">1.文件结构</h2>\n<ul>\n<li>train_data<ul>\n<li>new_wangfeng.txt</li>\n<li>preprocessing.py</li>\n<li>wangfeng.txt</li>\n</ul>\n</li>\n<li>generation</li>\n<li>main.py</li>\n<li>weights-improvement=26-0.105659.hdf5（<a href=\"https://pan.baidu.com/s/1eT3fTWQ\">百度网盘</a>）<br>111222<img src=\"/public/uploadFile/201809/_2.jpg\" style=\"height:500px;width:500px;\" alt=\"\"/>\n<img src=\"/public/uploadImg/201809/201809171209.jpg\" style=\"height:500px;width:500px;\" alt=\"\"/>\n</li>\n</ul>\n<ol>\n<li>train_data文件夹下是用作训练的数据，wangfeng.txt是原始数据，<br>preprocessing.py是很简单的文本预处理，new_wangfeng.txt是真<br>正的训练数据</li>\n<li>generation.py是生成脚本，用来生成歌词。(可直接运行)</li>\n<li>main.py是训练脚本</li>\n<li>weights-improvement=26-0.105659.hdf5是训练好的网络（28代左右，训练了12个小时）</li>\n</ol>\n<h2 id=\"2-\">2.网络结构</h2>\n<p>此实例基于keras，网络构建十分简单。</p>\n<pre><code class=\"language-python\">model.add(Embedding(n_vocab, 512, input_length=seq_length))\nmodel.add(LSTM(512, input_shape=(seq_length, 512), return_sequences=True))\nmodel.add(LSTM(1024))\nmodel.add(Dense(n_vocab, activation=&#39;softmax&#39;))</code></pre>\n<h2 id=\"3-\">3.实验结果</h2>\n<p>将代码clone下来后，直接运行main.py开始训练。<br>如果觉得训练时间太长，可以下载已训练好的<a href=\"https://pan.baidu.com/s/1eT3fTWQ\">网络</a>,放置同级目录下<br>然后直接运行generation.py(脚本里面加载的网络文件名称要统一)会出现如下结果：<br><img src=\"result.png\" alt=\"image\"></p>\n<h2 id=\"4-\">4.作者联系方式</h2>\n<p>邮箱：<a href=\"mailto:651010646@qq.com\">651010646@qq.com</a><br>欢迎讨论，共同学习。&#39;</p>\n', '2018-09-19 00:12:37');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `authority` int(11) DEFAULT '0' COMMENT '权限 0：无权限， 1：可编辑',
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('0', 'sws', 'e10adc3949ba59abbe56e057f20f883e', '石悟松', '2018-09-15 02:41:54', '1', '78b995a4f5f7c31edf4c53aaadfa38bf');
INSERT INTO `user` VALUES ('6', 'admin', 'c4ca4238a0b923820dcc509a6f75849b', '1', '2018-09-15 20:22:53', '1', '380e3a0c0042f85779b141fa3b6ef866');
