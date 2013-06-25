<?php
$soft = $_GET["soft"];
$file = "./libs/".$soft;
$handle=fopen($file,"r");
//header("Content-Type:application/java-archive");
header('application/vnd.android.package-archive');
Header ( "Content-Disposition: attachment; filename=" .$soft );
echo fread($handle,filesize($file));

fclose($handle);