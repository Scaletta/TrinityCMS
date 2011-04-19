///////////////////////////////////////////////
Project Title : TrinityCore Blizzard Website
Project Author : TheAdriann
///////////////////////////////////////////////
Credits

TheAdriann - Main Developer
Garth - HTML Release
BeLove - Contributer
///////////////////////////////////////////////



//More Information///
1. In order to add news, edit slideshows, manage comments, etc.. you must use a MySQL Client like sqlYog or NaviCat.
2. Run refresh_news.php to refresh the news' comments count.
    //For a bit of security
    2.1 Rename the 'refresh_news.php' into something like 'yourname919_rfnews.php' or something like that so that noone can access thise page.
    2.2 Run it after you've deleted a post from the database.
    2.3 I will release an admin panel soon so this will not be necessary to long.
    
3. If you have an invalid page, add it to messages table into your db (you have a few examples there).
    3.1 Also check out the link example in header.php in the menu part.

///Forum///
I've populated 'forum.sql' file with some forum data for you to see how the tables must be populated in the correct way.

///Instalation///

1. Create a TrinityCore Account Database (In case you don't have one)
2. Create a new database for your TrinityCore Blizzard Website
3. Execute sql/db.sql to your website database.
4. Execute sql/forum.sql to your website database.
5. Add the right information to your configs.php
6. Run tools/fill_users.php in your browser (In case you have pre-existing accounts in your account database)
7. Enjoy

Thank You,
TheAdriann.