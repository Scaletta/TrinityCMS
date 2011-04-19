<div id="header">
<div id="search-bar">
<form action="#" method="get" id="search-form">
<div>
<input type="submit" id="search-button" value="" tabindex="41"/>
<input type="text" name="q" id="search-field" maxlength="200" tabindex="40" alt="Unavailable" value="Unavailable" />
</div>
</form>
</div>
<h1 id="logo"><a href="<?php echo $website['address'];?>index.php">World of Warcraft</a></h1>
<div class="header-plate-wrapper">
<div class="header-plate">
<ul id="menu">

<?php if(isset($page_cat)){ ?>
<li class="menu-home"><a href="<?php echo $website['root']; ?>index.php" <?php if($page_cat=='home') echo'class="active"';?>><span>Home</span></a></li>
<li class="menu-game"><a href="<?php echo $website['root']; ?>game.php" <?php if($page_cat=='game') echo'class="active"';?>><span>Game</span></a></li>
<li class="menu-community"><a href="<?php echo $website['root']; ?>community.php" <?php if($page_cat=='community') echo'class="active"';?>><span>Community</span></a></li>
<li class="menu-media"><a href="<?php echo $website['root']; ?>message.php?mId=1" <?php if($page_cat=='media') echo'class="active"';?>><span>Media</span></a></li>
<li class="menu-forums"><a href="<?php echo $website['root']; ?>forum/" <?php if($page_cat=='forums') echo'class="active"';?>><span>Forums</span></a></li>
<li class="menu-services"><a href="<?php echo $website['root']; ?>services.php" <?php if($page_cat=='services') echo'class="active"';?>><span>Services</span></a></li>
</ul>
<?php
if($page_cat == "forums"){ include("../userplate.php"); }else{ include("userplate.php"); }
}else{ ?>
<li class="menu-home"><a href="<?php echo $website['root']; ?>index.php"><span>Home</span></a></li>
<li class="menu-game"><a href="<?php echo $website['root']; ?>game.php"><span>Game</span></a></li>
<li class="menu-community"><a href="<?php echo $website['root']; ?>community.php"><span>Community</span></a></li>
<li class="menu-media"><a href="<?php echo $website['root']; ?>message.php?mId=1"><span>Media</span></a></li>
<li class="menu-forums"><a href="<?php echo $website['root']; ?>forum/"><span>Forums</span></a></li>
<li class="menu-services"><a href="<?php echo $website['root']; ?>services.php"><span>Services</span></a></li>
</ul>
<?php include("userplate.php"); } ?>
</div>
</div>
</div>