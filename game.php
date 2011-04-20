<?php require_once("configs.php"); ?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-gb" xmlns:xml="http://www.w3.org/XML/1998/namespace" class="chrome chrome8">
<head>
<title><?php echo $website['title']; ?></title>
<meta content="false" http-equiv="imagetoolbar" />
<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />
<link rel="shortcut icon" href="wow/static/local-common/images/favicons/wow.ico" type="image/x-icon" />
<link rel="search" type="application/opensearchdescription+xml" href="http://eu.battle.net/en-gb/data/opensearch" title="Battle.net Search" />
<link rel="stylesheet" type="text/css" media="all" href="wow/static/local-common/css/common.css?v15" />
<!--[if IE]><link rel="stylesheet" type="text/css" media="all" href="wow/static/local-common/css/common-ie.css?v15" /><![endif]-->
<!--[if IE 6]><link rel="stylesheet" type="text/css" media="all" href="wow/static/local-common/css/common-ie6.css?v15" /><![endif]-->
<!--[if IE 7]><link rel="stylesheet" type="text/css" media="all" href="wow/static/local-common/css/common-ie7.css?v15" /><![endif]-->
<link title="World of Warcraft - News" href="wow/en/feed/news" type="application/atom+xml" rel="alternate" />
<link rel="stylesheet" type="text/css" media="all" href="wow/static/css/wow.css?v4" />
<link rel="stylesheet" type="text/css" media="all" href="wow/static/css/game/game-index.css?v4" />
<!--[if IE 6]><link rel="stylesheet" type="text/css" media="all" href="wow/static/css/game/game-ie6.css?v4" /><![endif]-->
<!--[if IE]><link rel="stylesheet" type="text/css" media="all" href="wow/static/css/wow-ie.css?v4" /><![endif]-->
<!--[if IE 6]><link rel="stylesheet" type="text/css" media="all" href="wow/static/css/wow-ie6.css?v4" /><![endif]-->
<!--[if IE 7]><link rel="stylesheet" type="text/css" media="all" href="wow/static/css/wow-ie7.css?v4" /><![endif]-->
<script type="text/javascript" src="wow/static/local-common/js/third-party/jquery-1.4.4.min.js"></script>
<script type="text/javascript" src="wow/static/local-common/js/core.js?v15"></script>
<script type="text/javascript" src="wow/static/local-common/js/tooltip.js?v15"></script>
<!--[if IE 6]> <script type="text/javascript">
//<![CDATA[
try { document.execCommand('BackgroundImageCache', false, true) } catch(e) {}
//]]>
</script>
<![endif]-->
<script type="text/javascript">
//<![CDATA[
Core.staticUrl = 'wow/static';
Core.baseUrl = 'wow/en';
Core.project = 'wow';
Core.locale = 'en-gb';
Core.buildRegion = 'eu';
Core.loggedIn = false;
Flash.videoPlayer = 'http://eu.media.blizzard.com/wow/player/videoplayer.swf';
Flash.videoBase = 'http://eu.media.blizzard.com/wow/media/videos';
Flash.ratingImage = 'http://eu.media.blizzard.com/wow/player/rating-pegi.jpg';
//]]>
</script>
</head>
<body class="en-gb game-index">
<div id="wrapper">
<?php $page_cat="game"; include("header.php"); ?>
<div id="content">
<div class="content-top">
<div class="content-trail">
<ol class="ui-breadcrumb">
<li><a href="index.php" rel="np"><?php echo $website['title']; ?></a></li>
<li class="last"><a href="game.php" rel="np">Game</a></li>
</ol>
</div>
<div class="content-bot">

		<div class="left-col">
			<br />
			<div class="section-title">
				<style type="text/css">
					.section-title p{
						text-shadow:0px 0px 5px #000;
					}
					
					blockquote
					{	
						height:16px;
						background:rgba(0,0,0,0.3);
						padding:8px;
						margin-left:70px;
						font-size:15px;
						color:#FF6A00;
						border:dashed 1px rgba(255,106,0,0.3);
					}
					
					#online{
						width:100px;
						background:rgba(0,0,0,0.3);
						-webkit-border-radius: 3px;
						-moz-border-radius: 3px;
						border-radius: 3px;
						-webkit-box-shadow : 0px 3px 5px 0px rgba(0,0,0,0.5);
						-moz-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.5);
						box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.5);
						color:#00CE18;
						text-shadow:0px -1px 7px #000;
					}
					
					#offline{
						width:100px;
						background:rgba(0,0,0,0.3);
						-webkit-border-radius: 3px;
						-moz-border-radius: 3px;
						border-radius: 3px;
						-webkit-box-shadow : 0px 3px 5px 0px rgba(0,0,0,0.5);
						-moz-box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.5);
						box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.5);
						color:#FF0000;
						text-shadow:0px -1px 7px #000;
					}
				</style>
				<span>Welcome to the<br/>World of Warcraft Game Guide</span>
				<p>In this article you will find out how to connect to our server.</p>
				<br /><br />
				<p>First, you need to download <a href="">World of Warcraft Cataclysm</a>.</p>
				<p>The second step is to update it until patch 4.0.6a</p>
				<p>Next step. <a href="">Create</a> your account</p>
				<p><a href="">Download this</a> client and copy into your WoW Installation directory</p>
				<p>Change realmlist.wtf (located into your WoW/Data/enUS(or)enGB/ directory) with :</p><br />
					<blockquote>,, set realmlist theadriann.zapto.org "</blockquote>
				<br />
				<p>Now ensure that the realm is online and have fun!</p>
				<br />
				<center>
				<img src="<?php echo $website['root']; ?>images/game/realm_status.png"/><br />
				<br />
				<?php
				/* To Lazy Now */
				$status = "offline";
				if($status == "online"){
					echo '<div id="online">Online</span>';
				}else if($status == "offline"){
					echo '<div id="offline">Offline</span>';
				}
				?>
				</center>
			</div>

		</div>
		<div class="right-col">
			<div class="sub-game-contents">
				<div class="recent-updates">
					<div class="sub-title">
						<span>Recent Updates</span>
					</div>
					<ul>
							<li><a href="#">Sorry, no guides at the moment<span>Coming Soon</span></a></li>
							<!--
							<li><a href="#">World of Warcraft Beginner’s Guide<span>12/02/10 9:58 PM</span></a></li>
							<li><a href="#">The Races of World of Warcraft<span>12/02/10 9:58 PM</span></a></li>
							<li><a href="#">The Classes of World of Warcraft<span>12/02/10 9:58 PM</span></a></li>
							-->
					</ul>
				</div>


				<div class="game-services">
					<div class="sub-title">
						<span>Web Features</span>
					</div>
					<div class="content-block">
						<ul>
							<!-- PVP LADDER
							<li>
								<span class="block content-2">
									<span class="content-title"><a href="/wow/pvp/arena/">Season 9 Arena Ladders</a></span>
									<span class="content-desc">
										The ranked Arena ladders for season 9 are live. Check them out now!
										<span class="content-block-arenalinks">
											&#8226; <a href="/wow/pvp/arena/2v2">2v2</a>
											&#8226; <a href="/wow/pvp/arena/3v3">3v3</a>
											&#8226; <a href="/wow/pvp/arena/5v5">5v5</a>
										</span>
									</span>
								</span>
							</li>
							-->
							<li>
								<a href="#" class="content-1">
									<span class="content-title">Realm Status</span>
									<span class="content-desc">Get real-time updates on the status of all <?php echo $website['title']; ?> realms.</span>
								</a>
							</li>
						</ul>
					</div>
				</div>

				
				<div class="game-moreinfo">
					<div class="sub-title">
						<span>Learn More</span>
					</div>
					<div class="content-block">
						<ul>
								<li>
									<a href="http://www.wowhead.com" class="content-1" onclick="return Core.open(this);">
										<span class="content-title">Wowhead</span>
										<span class="content-desc">Browse Wowhead's extensive database of World of Warcraft items, quests, NPCs, and much more!</span>
									</a>
								</li>
								<li>
									<a href="http://www.wowpedia.org" class="content-2" onclick="return Core.open(this);">
										<span class="content-title">Wowpedia</span>
										<span class="content-desc">Wowpedia is a comprehensive wiki dedicated to cataloguing the Warcraft universe.</span>
									</a>
								</li>
						</ul>
					</div>
				</div>
				
			</div>
		</div>

	<span class="clear"><!-- --></span>
</div>
</div>
</div>
<?php include("footer.php"); ?>
</div>
</div>
</div>
<div id="fansite-menu" class="ui-fansite"></div><div id="menu-container"></div><ul class="ui-autocomplete ui-menu ui-widget ui-widget-content ui-corner-all" role="listbox" aria-activedescendant="ui-active-menuitem" style="z-index: 6; top: 0px; left: 0px; display: none; "></ul></body>
</html>