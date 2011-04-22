<div id="footer">
<div id="sitemap" class="footer-ads">
<div class="column">
<h3 class="bnet">
<a href="#" tabindex="100">World of Warcraft</a>
</h3>
<ul>
<li><a href="#">Account</a></li>
<li><a href="#">Support</a></li>
</ul>
</div>
<div class="column">
<h3 class="games">
<a href="#" tabindex="100">Games</a>
</h3>
<ul>
<li><a href="#">World of Warcraft</a></li>
<li><a href="#">Game Client Downloads</a></li>
</ul>
</div>
<div class="column">
<h3 class="account">
<a href="#" tabindex="100">Account</a>
</h3>
<ul>
<li><a href="#">Can't log in?</a></li>
<li><a href="#">Create Account</a></li>
<li><a href="#">Account Summary</a></li>
<li><a href="#">Account Security</a></li>
</ul>
</div>
<div class="column">
<h3 class="support">
<a href="#" tabindex="100">Support</a>
</h3>
<ul>
<li><a href="#">Support Articles</a></li>
<li><a href="#">Help! I got hacked!</a></li>
</ul>
</div>
<div id="footer-ad">
<div class="sidebar-content">
<div class="bnet-offer">
<div class="bnet-offer-bg">
<a href="">
<img src="<?php echo $website['root'];?>more/copy.gif" width="300" height="100" alt="" />
</a>
</div>
<div class="desc">
<a href="#">
World of Warcraft
</a>
<div class="subtitle">
See Ya!
</div>
</div>
</div>
</div>
</div>
<div id="copyright">
<a href="javascript:;" tabindex="100" id="change-language">
<span>World of Warcraft - Entire World</span>
</a>
<br />
<small>Copyright &copy; 2011 <?php echo $website['title']; ?>.<br />Powered by TrinityCMS<br />Resources are in Blizzard Entertainment Property.</small>
</div>
<div id="international"></div>
<div id="legal">
<div id="blizzard" class="png-fix">
<a href="#" tabindex="100"><img src="<?php echo $website['root'];?>wow/static/local-common/images/logos/blizz-wow.png" alt="" /></a>
</div>
<span class="clear"><!-- --></span>
</div>
</div>
</div>

<div id="service">
<ul class="service-bar">
<li class="service-cell service-home"><a href="#" tabindex="50" accesskey="1" title="Home"><div style="width:45px;">&nbsp;</div></a></li>
<?php if(isset($_SESSION['username'])){ ?>
<li class="service-cell service-welcome">Welcome, <a href=""><?php echo strtolower($_SESSION['username']); ?></a> | <a href="<?php echo $website['root'];?>logout.php">Log Out</a></li>
<?php }else{ ?>
<li class="service-cell service-welcome"><a href="?login" onclick="return Login.open('<?php echo $website['root'];?>login.php?<?php echo $_SESSION['sessionid']; ?>')">Log in</a> or <a href="register.php">Create an Account</a></li>
<?php } ?>
<li class="service-cell service-account"><a href="#" class="service-link" tabindex="50" accesskey="3">Account</a></li>
<li class="service-cell service-support"><a href="#" class="service-link" tabindex="50" accesskey="4">Support</a></li>
<li class="service-cell service-explore">
<a href="#explore" tabindex="50" accesskey="5" class="dropdown" id="explore-link" style="cursor: pointer; " rel="javascript">Explore</a>
<div class="explore-menu" id="explore-menu" style="display:none;">
<div class="explore-primary">
<ul class="explore-nav">
<li>
<a href="index.php" tabindex="55">
<strong class="explore-caption"><?php echo $website['title']; ?></strong>
Keep your friends in game.
</a>
</li>
<li>
<a href="#" tabindex="55">
<strong class="explore-caption">Account</strong>
Manage your Account
</a>
</li>
<li>
<a href="#" tabindex="55">
<strong class="explore-caption">Support</strong>
Get Support and explore the knowledgebase.
</a>
</li>
<li>
<a href="#" tabindex="55">
<strong class="explore-caption">Donate</strong>
Donate for <?php echo $website['title']; ?>.
</a>
</li>
</ul>
<div class="explore-links">
<h2 class="explore-caption">More</h2>
<ul>
<li><a href="" tabindex="55">Retrieve Lost Account</a></li>
<li><a href="" tabindex="55">Download World of Warcraft Client</a></li>
</ul>
</div>
<span class="clear"><!-- --></span>
</div>
<!--<ul class="explore-secondary">
<li class="explore-game explore-game-sc2">
<a href="http://eu.battle.net/sc2/" tabindex="55">
<strong class="explore-caption">StarCraft II</strong>
<span>Community Site</span> <span>Forum Discussions</span> <span>Character Profiles and more…</span>
</a>
</li>
<li class="explore-game explore-game-wow">
<a href="http://eu.battle.net/wow/" tabindex="55">
<strong class="explore-caption">World of Warcraft</strong>
<span>Community Site</span> <span>Forum Discussions</span> <span>Character Profiles and more…</span>
</a>
</li>
<li class="explore-game explore-game-d3">
<a href="http://eu.battle.net/games/d3" tabindex="55">
<strong class="explore-caption">Diablo III</strong>
<span>Under Development, visit the Announcement Site</span>
</a>
</li>
</ul>-->
</div>
</li>
</ul>
</div>
<script type="text/javascript"> 
//<![CDATA[
var xsToken = '';
var Msg = {
cms: {
requestError: 'Your request cannot be completed.',
ignoreNot: 'Not ignoring this user',
ignoreAlready: 'Already ignoring this user',
stickyRequested: 'Sticky requested',
postAdded: 'Post added to tracker',
postRemoved: 'Post removed from tracker',
userAdded: 'User added to tracker',
userRemoved: 'User removed from tracker',
validationError: 'A required field is incomplete',
characterExceed: 'The post body exceeds XXXXXX characters.',
searchFor: "Search for",
searchTags: "Articles tagged:",
characterAjaxError: "You may have become logged out. Please refresh the page and try again.",
ilvl: "Item Lvl",
shortQuery: "Search requests must be at least two characters long."
},
bml: {
bold: 'Bold',
italics: 'Italics',
underline: 'Underline',
list: 'Unordered List',
listItem: 'List Item',
quote: 'Quote',
quoteBy: 'Posted by {0}',
unformat: 'Remove Formating',
cleanup: 'Fix Linebreaks',
item: 'WoW Item',
itemPrompt: 'Item ID:',
url: 'URL',
urlPrompt: 'URL Address:'
},
ui: {
viewInGallery: 'View in gallery',
loading: 'Loading…',
unexpectedError: 'An error has occurred',
fansiteFind: 'Find this on…',
fansiteFindType: 'Find {0} on…',
fansiteNone: 'No fansites available.'
},
grammar: {
colon: '{0}:'
},
fansite: {
achievement: 'achievement',
character: 'character',
faction: 'faction',
'class': 'class',
object: 'object',
talentcalc: 'talents',
skill: 'skill',
quest: 'quest',
spell: 'spell',
event: 'event',
title: 'title',
arena: 'arena',
guild: 'guild',
zone: 'zone',
item: 'item',
race: 'race',
npc: 'NPC',
pet: 'pet'
}
};
//]]>
</script>
<script type="text/javascript" src="wow/static/local-common/js/menu.js?v15"></script>
<script type="text/javascript" src="wow/static/js/wow.js?v4"></script>
<script type="text/javascript"> 
friendData = [];
$(function(){
Menu.initialize('data/menu.json');
Search.init('ta/lookup');
});
</script>
<!--[if lt IE 8]> <script type="text/javascript" src="wow/static/local-common/js/third-party/jquery.pngFix.pack.js?v15"></script>
<script type="text/javascript">$('.png-fix').pngFix();</script>
<![endif]-->
<script type="text/javascript" src="wow/static/local-common/js/cms.js?v15?v2"></script>
<script type="text/javascript">
//<![CDATA[
Core.load("<?php echo $website['root'];?>wow/static/local-common/js/third-party/jquery-ui-1.8.6.custom.min.js?v15");
Core.load("<?php echo $website['root'];?>wow/static/local-common/js/overlay.js?v15");
Core.load("<?php echo $website['root'];?>wow/static/local-common/js/search.js?v15");
Core.load("<?php echo $website['root'];?>wow/static/local-common/js/login.js?v15", false, function() {
Login.embeddedUrl = '<?php echo $website['root'];?>loginframe.php';
});
//]]>
</script>
