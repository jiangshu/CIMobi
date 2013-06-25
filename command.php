<?php
include_once("./conf.php");

class Command{
    private $argument;
    public function __construct(){
        $this->argument = "";
        if(isset($_POST["native"])&&$_POST["native"] ){
            $this->argument.= " browser=native";
        }else if(isset($_POST["QQ"])&&$_POST["QQ"]){
            $this->argument.= " browser=QQ";
        }else if(isset($_POST["uc"])&&$_POST["uc"]){
            $this->argument.= " browser=uc";
        }else if(isset($_POST["chrome"])&&$_POST["chrome"]){
            $this->argument.= " browser=chrome";
        }else if(isset($_POST["opera"])&&$_POST["opera"]){
            $this->argument.= " browser=opera";
        }

        if(isset($_POST["url"])){
            $this->argument.= " url=".$_POST["url"];
        }
        if(isset($_POST["sysVersion"])){
            $this->argument.= " androidVersion=".$_POST["sysVersion"];
        }
        if(isset($_POST["mobileType"])){
            $this->argument.= " mobileType=".$_POST["mobileType"];
        }

        if(isset($_POST["isAll"])){
            $this->argument.= " isAll=true";
        }
    }

    public function execute(){
        $cmd = "java -jar ./libs/CIMobile_Cmd.jar".
            " ip=".IP.
            " port=".PORT.
            " action=openBrowser".
            $this->argument;
        file_put_contents("./libs/command",$cmd);
        PassThru($cmd);
//         return $cmd;
    }
}
//$_POST["browser"] = "uc";
//$_POST["url"] = "http://www.baidu.com";
$command = new Command();
$command->execute();
//echo $result;