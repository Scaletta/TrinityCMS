/*Table structure for table `account` */



DROP TABLE IF EXISTS `account`;



CREATE TABLE `account` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Identifier',
  `username` varchar(32) NOT NULL DEFAULT '',
  `sha_pass_hash` varchar(40) NOT NULL DEFAULT '',
  `gmlevel` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `sessionkey` longtext,
  `v` longtext,
  `s` longtext,
  `email` text,
  `joindate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_ip` varchar(30) DEFAULT '0.0.0.0',
  `failed_logins` int(11) unsigned NOT NULL DEFAULT '0',
  `locked` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `last_login` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `active_realm_id` int(11) unsigned NOT NULL DEFAULT '0',
  `expansion` tinyint(3) unsigned NOT NULL DEFAULT '2',
  `mutetime` bigint(40) unsigned NOT NULL DEFAULT '0',
  `locale` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `reff` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_username` (`username`),
  KEY `idx_gmlevel` (`gmlevel`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='Account System';



/*Data for the table `account` */



insert  into `account`(`id`,`username`,`sha_pass_hash`,`gmlevel`,`sessionkey`,`v`,`s`,`email`,`joindate`,`last_ip`,`failed_logins`,`locked`,`last_login`,`active_realm_id`,`expansion`,`mutetime`,`locale`,`reff`) values (6,'TEST_10','57554d0c5d351a9e5677877cde3ced34ee14341f',0,NULL,NULL,NULL,'test@hotmail.com','2011-01-04 03:44:31','190.84.26.218',0,0,'0000-00-00 00:00:00',0,2,0,0,NULL),(5,'THEADRIANN','8d43530f024a124291503b3ca8965e8b4983ec97',0,NULL,NULL,NULL,'adriann54@yahoo.com','2011-01-04 00:34:07','89.122.152.130',0,0,'0000-00-00 00:00:00',0,2,0,0,NULL),(7,'AORO','7c0cd7c35c66da3255cc92dafc6696025d883a23',0,NULL,NULL,NULL,'romneyad@hotmail.com','2011-01-04 09:47:30','211.27.234.225',0,0,'0000-00-00 00:00:00',0,2,0,0,NULL),(8,'SALJA','6bf8084a61d2f2b5b801cc05f64783093c240e3c',0,NULL,NULL,NULL,'beleko2009@web.de','2011-01-04 13:50:22','178.202.148.203',0,0,'0000-00-00 00:00:00',0,2,0,0,NULL);



/*Table structure for table `account_banned` */



DROP TABLE IF EXISTS `account_banned`;



CREATE TABLE `account_banned` (
  `id` int(11) NOT NULL DEFAULT '0' COMMENT 'Account id',
  `bandate` bigint(40) NOT NULL DEFAULT '0',
  `unbandate` bigint(40) NOT NULL DEFAULT '0',
  `bannedby` varchar(50) NOT NULL,
  `banreason` varchar(255) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`,`bandate`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='Ban List';



/*Data for the table `account_banned` */



/*Table structure for table `ip_banned` */



DROP TABLE IF EXISTS `ip_banned`;



CREATE TABLE `ip_banned` (
  `ip` varchar(32) NOT NULL DEFAULT '0.0.0.0',
  `bandate` bigint(40) NOT NULL,
  `unbandate` bigint(40) NOT NULL,
  `bannedby` varchar(50) NOT NULL DEFAULT '[Console]',
  `banreason` varchar(255) NOT NULL DEFAULT 'no reason',
  PRIMARY KEY (`ip`,`bandate`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='Banned IPs';



/*Data for the table `ip_banned` */




/*Table structure for table `realmcharacters` */



DROP TABLE IF EXISTS `realmcharacters`;



CREATE TABLE `realmcharacters` (
  `realmid` int(11) unsigned NOT NULL DEFAULT '0',
  `acctid` bigint(20) unsigned NOT NULL,
  `numchars` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`realmid`,`acctid`),
  KEY `acctid` (`acctid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='Realm Character Tracker';



/*Data for the table `realmcharacters` */


/*Table structure for table `realmd_db_version` */



DROP TABLE IF EXISTS `realmd_db_version`;



CREATE TABLE `realmd_db_version` (
  `required_10008_01_realmd_realmd_db_version` bit(1) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=FIXED COMMENT='Last applied sql update to DB';



/*Data for the table `realmd_db_version` */



insert  into `realmd_db_version`(`required_10008_01_realmd_realmd_db_version`) values (NULL);



/*Table structure for table `realmlist` */



DROP TABLE IF EXISTS `realmlist`;



CREATE TABLE `realmlist` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL DEFAULT '',
  `address` varchar(32) NOT NULL DEFAULT '127.0.0.1',
  `port` int(11) NOT NULL DEFAULT '8085',
  `icon` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `realmflags` tinyint(3) unsigned NOT NULL DEFAULT '2' COMMENT 'Supported masks: 0x1 (invalid, not show in realm list), 0x2 (offline, set by mangosd), 0x4 (show version and build), 0x20 (new players), 0x40 (recommended)',
  `timezone` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `allowedSecurityLevel` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `population` float unsigned NOT NULL DEFAULT '0',
  `realmbuilds` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='Realm System';



/*Data for the table `realmlist` */



insert  into `realmlist`(`id`,`name`,`address`,`port`,`icon`,`realmflags`,`timezone`,`allowedSecurityLevel`,`population`,`realmbuilds`) values (1,'Rablatonos','sex_on_fire',8085,1,2,1,0,0.04,'12340 ');



/*Table structure for table `uptime` */



DROP TABLE IF EXISTS `uptime`;



CREATE TABLE `uptime` (
  `realmid` int(11) unsigned NOT NULL,
  `starttime` bigint(20) unsigned NOT NULL DEFAULT '0',
  `startstring` varchar(64) NOT NULL DEFAULT '',
  `uptime` bigint(20) unsigned NOT NULL DEFAULT '0',
  `maxplayers` smallint(5) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`realmid`,`starttime`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='Uptime system';
