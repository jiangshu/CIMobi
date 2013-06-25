$(function(){
    GE  = "GE" in window? window.GE : {};

   String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
        if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
            return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);
        } else {
            return this.replace(reallyDo, replaceWith);
        }
    };

    var regComb = function(regA,regB){
        var regs = [], i,j;
        if(isFull(regA) && isFull(regB)){
            for(i=0;i<regA.length;i++){
                for(j=0;j<regB.length;j++){
                    regs.push(regA[i]+","+regB[j]);
                }
            }
        }
        return regs;
    },

    isFull = function(array){
        return !!(array.length>0)?true:false;
    };



  /*
   *筛选事件中心
   * */
   var filterEvent = function(){
       var mobile=[],version=[],browser=[],i;
       $.each($(".sysVersion"),function(key,el){
           if($(el).attr("checked")){
               version.push($(el).val());
           }
       });
       $.each($(".mobileType"),function(key,el){
           if($(el).attr("checked")){
               mobile.push($(el).val());
           }
       });
       $.each($(".browserType"),function(key,el){
           if($(el).attr("checked")){
               browser.push($(el).val());
           }
       });
       var browser_bak = [];
       if(!isFull(mobile) && !isFull(version)){
           $("#filterInfo").children().remove();
           return;
       }
       if(isFull(mobile)){
           var mobile_b = [];
           for(i=0;i<mobile.length;i++){
               mobile_b.push("[^,]*"+mobile[i]+"[^,]*");
           }
           mobile = mobile_b;
       }else{
           mobile.push("[^,]*");
       }

       if(!isFull(version)){
           version.push("[^,]*");
       }

       if(isFull(browser)){
           var browser_b = [];
           for(i=0;i<browser.length;i++){
               browser_b.push("[^,]*"+browser[i]);
               browser_bak.push(browser[i]);
           }
           browser = browser_b;
       }else{
           browser.push("[^,]*");
       }

       var conditions = regComb(regComb(mobile,version),browser);
       var satMobileList = getMobile(conditions,browser_bak);
       displayMobileList(satMobileList);
   };

    var mobileInfo = {
        "1111":"htc,2.1,native&uc&QQ",
        "2222":"htc,2.2,native&uc&QQ",
        "3333":"htc,2.3,native&uc&QQ",
        "4444":"htc,4.1,native&uc&QQ",
        "5555":"htc,4.2,native&uc&QQ"
    };

    $.ajax({
        type:"get",
        dataType:"json",
        url:"./MobiInfo.php?type=2",
        success:function(data){
            mobileInfo = data;
        }});


   /*
    *  获取筛选结果
    * */
    var getMobile = function(conditions,browser){
//        var mobile=["htc","zet"],version=["2.1","4.1"],browser=["uc","QQ"];
        var satMobileList = {};
//        var conditions = getConditon(mobile,version,browser);
        var condition = "";
        var reg;
        for(var i=0;i<conditions.length;i++){
            condition = conditions[i];
            reg = new RegExp(condition,"gi");
            $.each(mobileInfo,function(id,info){
                 if(reg.test(info)){
                     var infoArr = info.split(",");
                     if(!isFull(browser)){
                         if(!(id in satMobileList)){
                             satMobileList[id] = {};
                             satMobileList[id]["id"] = id;
                             satMobileList[id]["type"]=infoArr[0];
                             satMobileList[id]["version"]=infoArr[1];
                             satMobileList[id]["browser"]=infoArr[2];
                         }
                     }else{
                         condition = condition.replace("[^,]*","");
                         condition = condition.replace("[^,]*","");
                         condition = condition.replace("[^,]*","");
                         condition = condition.replace("[^,]*","");
                         condition = condition.replace("[^,]*","");
                         condition = condition.replace("[^,]*","");

                         var argArr = condition.split(",");
                         var bro = argArr[argArr.length -1];
                         bro = bro.replace("[^,]*","");
                         if(id in satMobileList){
                             satMobileList[id]["browser"]+= "&"+bro;
                         }else{
                             satMobileList[id] = {};
                             satMobileList[id]["id"] = id;
                             satMobileList[id]["type"]=infoArr[0];
                             satMobileList[id]["version"]=infoArr[1];
                             satMobileList[id]["browser"]=bro;
                         }
                     }
                 }
            })
        }
      return satMobileList;
    };

   /*
    *显示mobile信息
    * */
    var displayMobileList = function(satMobileList){
        var tpl  = function(id,type,version,browser){
            return "<tr>" +
                "<td><input type='checkbox' data_browser='"+browser+"' data_id='"+id+"' class='filterResult' checked/></td>" +
                "<td>"+type+"</td>" +
                "<td>"+version+"</td>" +
                "<td>"+browser+"</td>" +
                "/<tr>" ;
        };
        var html =" <tr>" +
            "<td width='10%'></td>" +
            "<td width='25%'>型号</td>" +
            "<td width='15%'>版本</td>" +
            "<td width='50%'>浏览器</td>" +
            "</tr>";
        $("#filterInfo").children().remove();
        $("#filterInfo").append(html);

        $.each(satMobileList,function(id,satMobile){
            $("#filterInfo").append(tpl(satMobile["id"],satMobile["type"],satMobile["version"],satMobile["browser"].replace(/&/g," ")));
        })
    };

    $(".sysVersion").on("click",filterEvent);
    $(".mobileType").on("click",filterEvent);
    $(".browserType").on("click",filterEvent);

    /*
     * 注册执行事件
     * */
    $("#execute1").on("click",function(){
           if( $("#url").val() == ""){
               addLog("url不能为空");
               return;
           }
           var filterResult = [];
           $.each(($(".filterResult")),function(key,mobileInstance){
                if($(mobileInstance).attr("checked")){
                    var browserArr =$(mobileInstance).attr("data_browser").split(" ");
                    var browsers = "";
                    if(browserArr.length == 1){
                        browsers = browserArr[0];
                    }else{
                        browsers = browserArr.join("@");
                        browsers = browsers.slice(0,browsers.length-1);
                    }
                    filterResult.push({
                        id:$(mobileInstance).attr("data_id"),
                        browser:browsers,
                        url:$("#url").val()
                    });
                }
           });

        var sendCommand = function(sendData){
            addLog("正在打开浏览器...");
            $.post("./action.php",sendData,function(data){
                addLog(data);
            });
        };

        var index = 0;
        if(filterResult.length>0){
            sendCommand(filterResult[index]);
            index++;
            if(index<filterResult.length){
                var excuteInterval = setInterval(function(){
                    if(index<filterResult.length){
                        sendCommand(filterResult[index]);
                        index++;
                    }else{
                        clearInterval(excuteInterval);
                    }
                },50);
            }
        }else{
            addLog("没有选择mobile");
        }
    });

   /*
    *打印日志
    * */
    var addLog = function(log){
         $("#log ul").append("<li>"+(new Date())+":  "+log+"</li>");
    };

    var setLogPositon = function(){
        $("#log").css("display","none");
        var top = $(".body .filter_content").offset().top;
        var height = $(".body .filter_content").height();

        if(top + height + 110 >$("body").height()){
            $("#log").css("top",top+height+20);
        }else{
            $("#log").css("top",$("body").height()-115);
        }
        $("#log").css("display","block");
    };

    $(window).on("resize",function(){
        setLogPositon();
    });

    setLogPositon();

});


//$("#execute").on("click",function(){
//    var postData = {};
//    var hasBrowser = false;
//    var cmd = "正在执行 openBrowser";
//    if($("#isSysVersion").attr("checked")){
//        postData.sysVersion = $("#sysVersion").val();
//        cmd+= " androidVersion="+$("#sysVersion").val();
//    }
//
//    if($("#isMobileType").attr("checked")){
//        postData.mobileType = $("#mobileType").val();
//        cmd+= " mobileType="+$("#mobileType").val();
//    }
//
//    if($("#native").attr("checked")){
//        postData.native =true;
//        hasBrowser = true;
//        cmd+= " native=true";
//    }
//
//    if($("#QQ").attr("checked")){
//        postData.QQ =true;
//        hasBrowser = true;
//        cmd+= " QQ=true";
//    }
//
//    if($("#uc").attr("checked")){
//        postData.uc =true;
//        hasBrowser = true;
//        cmd+= " uc=true";
//    }
//
//    if($("#chrome").attr("checked")){
//        postData.chrome =true;
//        hasBrowser = true;
//        cmd+= " chrome=true";
//    }
//
//    if($("#opera").attr("checked")){
//        postData.opera =true;
//        hasBrowser = true;
//        cmd+= " opera=true";
//    }
//
//    if(!hasBrowser){
//        addLog("未指定浏览器");
//        return;
//    }
//
//    if($("#url").val()==""){
//        addLog("url不能为空！");
//        return;
//    }else{
//        postData.url = $("#url").val();
//        cmd+= " url="+$("#url").val();
//    }
//
//    cmd+=" ...";
//    postData.action = "openBrowser";
//    addLog(cmd);
//    $.post("./command.php",postData,
//        function(data,status){
//            addLog(data);
//        })
//});