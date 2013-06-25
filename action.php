<?php
include_once("./conf.php");

class Command{
    private $argument;
    public function __construct(){
        $this->argument = "";
        if(isset($_POST["id"])&&$_POST["id"] ){
            $this->argument.= " id=".$_POST["id"];
        }
        if(isset($_POST["browser"])&&$_POST["browser"]){
            $this->argument.= " browser=".$_POST["browser"];
        }

        if(isset($_POST["url"])&&$_POST["url"]){
            $this->argument.= " url=".$_POST["url"];
        }
    }

    public function execute(){
        $cmd = "java -jar ./libs/CIMobile_Cmd.jar".
                " ip=".IP.
                " port=".PORT.
                " action=openBrowser".
                $this->argument;
        PassThru($cmd);
//        echo $cmd;
    }
}

$command = new Command();
$command->execute();