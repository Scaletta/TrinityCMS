<?php
$sessionid = session_id();
if($sessionid == ""){
  session_start();
}

$sessionid = session_id();
if ($sessionid == '') session_start();
if (!isset($_SESSION['safety'])){
    session_regenerate_id(true);
    $_SESSION['safety'] = true;
}
$_SESSION['sessionid'] = session_id();

$serveraddress = "localhost"; // Your mysql server address
$serveruser = "root"; // Your mysql user
$serverpass = "*****"; //Your mysql password

$server_db = "wowsite"; //Your website database
$server_adb = "em_auth"; //Your account database
$server_cdb = "em_chars"; //Your characters database
$server_wdb = "em_world"; //Your world database

$website['title'] = "TrinityCMS";
$website['address'] = "http://theadriann.zapto.org/TrinityCMS/"; // 'http://url/foldername/' or 'http://url/'
$website['root'] = "/TrinityCMS/"; // '/' <- for root and '/foldername/' <- for any folder
//Initialize Lang Files
include("lang/eng.php");

$connection_setup = mysql_connect($serveraddress,$serveruser,$serverpass)or die(mysql_error());
mysql_select_db($server_db,$connection_setup)or die(mysql_error());

if(isset($_SESSION['username'])){
	mysql_select_db($server_adb,$connection_setup)or die(mysql_error());
	$username = mysql_real_escape_string($_SESSION['username']);
	$lbrspa = mysql_query("SELECT * FROM account WHERE username = '".$username."'");
	$account_information = mysql_fetch_assoc($lbrspa);
	mysql_select_db($server_db,$connection_setup)or die(mysql_error());
}