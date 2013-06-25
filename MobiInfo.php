<?php
include_once("./conf.php");

class MobileInfo{
    public  static function getMobileInfo(){
        $xmlFile = MOBILEINFO;
        if(file_exists($xmlFile)){
            $mobileInfo = array();
            $dom = new DOMDocument('1.0',"utf-8");
            $dom->load($xmlFile);
            $xpath = new DOMXPath($dom);
            $mobile = $xpath->evaluate('/mobile_info/mobile');
            for($i=0; $i<$mobile->length; $i++){
                $mobileInstance = array();
                $browser = array();
                $package = array();
                $mobileInstance["id"] = $mobile->item($i)->getAttribute("id");
                $mobileInstance["ip"] = $mobile->item($i)->getAttribute("ip");
                $mobileInstance["name"] = $mobile->item($i)->getAttribute("name");
                $mobileInstance["sysVersion"] = $mobile->item($i)->getAttribute("sysVersion");
                $mobileInstance["alias"] = $mobile->item($i)->getAttribute("alias");
                $nodes = $mobile->item($i)->childNodes;
                for($j=0; $j<$nodes->length; $j++){
                    if($nodes->item($j)->nodeName == "browser"){
                        $browser[] = $nodes->item($j)->nodeValue;
                    }else if($nodes->item($j)->nodeName == "package"){
                       $package[] = $nodes->item($j)->nodeValue;
                    }
                }
                $mobileInstance["browser"] = $browser;
                $mobileInstance["package"] = $package;
                $mobileInfo[] = $mobileInstance;
            }
            return $mobileInfo;
        }else{
            return array();
        }
    }

    public static function getMobileSimpleInfo(){
        $xmlFile = MOBILEINFO;
        if(file_exists($xmlFile)){
            $mobileInfo = array();
            $dom = new DOMDocument('1.0',"utf-8");
            $dom->load($xmlFile);
            $xpath = new DOMXPath($dom);
            $mobile = $xpath->evaluate('/mobile_info/mobile');
            for($i=0; $i<$mobile->length; $i++){
               $mobileInfo =
                array_merge($mobileInfo,array(
                    $mobile->item($i)->getAttribute("id") =>  $mobile->item($i)->getAttribute("infoReg")
                ));
            }
            return $mobileInfo;
        }else{
            return array();
        }
    }
}

if(isset($_GET["type"]) && $_GET["type"]==1){
    echo json_encode(MobileInfo::getMobileInfo());
}else{
    echo json_encode(MobileInfo::getMobileSimpleInfo());
}
