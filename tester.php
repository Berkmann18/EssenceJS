<title>PHP Tester</title>
<?php
    require_once ("C:\Abyss Web Server\essence.php");
    echo "<p><b>Request:</b> ".$_SERVER['REQUEST_METHOD']."</p><p><b>get/post a: </b>".get("a")."/".post("a")."</p><p><b>get/post b: </b>".get("b")."/".post("b")."</p><p><b>get/post data: </b>".get("data")."/".post("data")."</p>";
?>