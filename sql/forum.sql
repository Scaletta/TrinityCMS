/*Table structure for table `forum_blizzposts` */DROP TABLE IF EXISTS `forum_blizzposts`;CREATE TABLE `forum_blizzposts` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `postid` int(10) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*Data for the table `forum_blizzposts` */insert  into `forum_blizzposts`(`id`,`type`,`author`,`postid`,`date`) values (8,'reply','theadriann',34,'2011-01-04 18:47:24'),(7,'reply','theadriann',33,'2011-01-04 18:42:12'),(6,'reply','theadriann',32,'2011-01-04 18:32:48'),(5,'reply','theadriann',31,'2011-01-04 18:32:36'),(9,'reply','theadriann',35,'2011-01-04 19:14:52'),(10,'reply','theadriann',36,'2011-01-04 19:20:33'),(11,'reply','theadriann',44,'2011-01-07 19:08:05');

/*Table structure for table `forum_categ` */DROP TABLE IF EXISTS `forum_categ`;CREATE TABLE `forum_categ` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `num` int(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`num`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*Data for the table `forum_categ` */insert  into `forum_categ`(`id`,`num`,`name`) values (1,1,'World of Warcraft'),(2,2,'Gameplay');/*Table structure for table `forum_forums` */DROP TABLE IF EXISTS `forum_forums`;CREATE TABLE `forum_forums` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `num` int(10) NOT NULL DEFAULT '1',
  `categ` int(10) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text,
  `locked` smallint(1) DEFAULT '0',
  PRIMARY KEY (`id`,`num`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;/*Data for the table `forum_forums` */insert  into `forum_forums`(`id`,`num`,`categ`,`name`,`image`,`description`,`locked`) values (1,1,1,'News','scroll','Collection of important messages regarding the news & updates related to this website.',1),(2,2,1,'General','general','Discuss everything here...',0),(3,3,1,'Test Forum','test','test forum',0);

/*Table structure for table `forum_replies` */DROP TABLE IF EXISTS `forum_replies`;CREATE TABLE `forum_replies` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `threadid` int(10) NOT NULL,
  `content` text,
  `author` int(10) DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `forumid` int(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;/*Data for the table `forum_replies` */insert  into `forum_replies`(`id`,`threadid`,`content`,`author`,`date`,`forumid`,`name`) values (34,1,'testing - [b]bold[/b]<br />\r\ntesting - [i]italic[/i]<br />\r\ntesting - [u]underline[/u]<br />\r\ntesting - lines\r\n[ul][li]first line[/li][li]second line[/li][li]third line[/li][/ul]\r\ntesting - code\r\n[code]blablabla[/code]',5,'2011-01-04 18:47:24',1,'Testing'),(36,2,'yep yep....that was a  [code]gewd question :)[/code]',5,'2011-01-04 19:20:33',3,'Updates?'),(37,1,'nice on fixing stuff<br />\r\nshould make it when you click reply at the top it sends your down here or to a full page where you have more options to reply with',7,'2011-01-04 23:25:21',1,'Testing'),(38,1,' [quote]HAHA[/quote]',13,'2011-01-05 02:13:56',1,'Testing'),(39,1,' [code];O[/code]',13,'2011-01-05 02:25:52',1,'Testing'),(40,1,' [quote]OMG[/quote]',7,'2011-01-05 09:14:20',1,'Testing'),(41,1,' [code]testing[/code]<br />\r\n [u]testing[/u]<br />\r\n [item=\\\"1\\\" /]',7,'2011-01-05 13:56:33',1,'Testing'),(42,1,'[quote]testing[/quote]<br />\r\n<br />\r\n[quote]testing[/quote]',7,'2011-01-05 13:57:06',1,'Testing'),(43,1,'there seem to be some weird bugs with quote ',7,'2011-01-05 13:57:38',1,'Testing'),(44,3,'testing new',5,'2011-01-07 19:08:05',1,'Test Creating Thread'),(33,1,'testing - <br />\r\ntesting - bold<br />\r\ntesting - italic<br />\r\ntesting - underline<br />\r\n[ul][li]testing - [/li]<br />\r\n[li]testing - [/li]<br />\r\n[li]testing - [/li]<br />\r\ntesting - <br />\r\ntesting - [/ul]',5,'2011-01-04 18:42:12',1,'Testing'),(35,1,' [code][i]*Solved that problem[/i] ;)[/code]',5,'2011-01-04 19:14:52',1,'Testing'),(31,1,'lacrimi :P',5,'2011-01-04 18:32:36',1,'Testing'),(32,1,'[quote]theadriann<br />\r\nStaff Member<br />\r\nlacrimi :P[/quote]',5,'2011-01-04 18:32:48',1,'Testing');

/*Table structure for table `forum_threads` */DROP TABLE IF EXISTS `forum_threads`;CREATE TABLE `forum_threads` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `forumid` int(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `author` int(10) DEFAULT NULL,
  `replies` int(10) DEFAULT NULL,
  `views` int(10) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `content` text NOT NULL,
  `locked` tinyint(1) DEFAULT '0',
  `has_blizz` tinyint(1) DEFAULT '0',
  `prefix` varchar(255) DEFAULT 'none',
  PRIMARY KEY (`id`,`forumid`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;/*Data for the table `forum_threads` */insert  into `forum_threads`(`id`,`forumid`,`name`,`author`,`replies`,`views`,`date`,`content`,`locked`,`has_blizz`,`prefix`) values (2,3,'Updates?',5,1,40,'2010-01-04','Updates here?',0,0,'none'),(3,1,'Test Creating Thread',5,NULL,5,'2011-01-07','Yes it works!',1,0,'none'),(1,1,'Testing',5,12,53,'2010-01-04','testing...',0,0,'none');