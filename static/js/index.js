$(function(){


    var mobileInfo;
    var index = 1;
    /*
     * 拼接一个mobile实例的html
     * */
    function joinHtml(mobileInstance){
        function getBrowser(index){
            var browser = "<table width='90%' align='center'><tr><td width='40%'>";
                browser+= "<table width='100%' align='center'>";
            var index_flag = 0;
            $.each(mobileInstance.browser,function(key,val){
                index_flag = key;
                if(key%3 == 0){
                    browser+="<tr>";
                }
                    browser+= "<td><input type='radio' value='"+val+"' name='browser"+index+"'/>"+val+"</td>";
                if(key%3 ==2){
                    browser+="</tr>";
                }

            });
            if(index_flag%3 !=2){
                browser+="</tr>";
            }
            browser+="</table>";
            browser+= "</td><td width='50%'>";
            browser+= "<input class='url' type='text'/>";
            browser+= "</td><td width='10%'>";
            browser+= "<input class='start' type='button' value='启动' data_id='"+mobileInstance.id+"'/>";
            browser+= "</td></tr></table>";
            return browser;
        }

        function getPackage(){
            var package = "<select>";
            $.each(mobileInstance.package,function(key,val){
                package = package+"<option>"+val+"</option>"
            });
            package+= "<input class='install' type='button' value='安装'/>";
            package+= "<input class='uninstall' type='button' value='卸载'/>";
            package+= "</select>";
            return package;
        }

       var html = "" +
           "<tr class='mobile_item'>" +
               "<td>"+ index +"</td>" +
               "<td>"+mobileInstance.name+"</td>" +
               "<td>"+mobileInstance.sysVersion+"</td>" +
               "<td>"+mobileInstance.alias+"</td>" +
               "<td>"+getBrowser(index)+"</td> " +
//               "<td>"+getPackage()+"</td>" +
           "</tr>"
        return html;
    }

    var showtip = function(data){
        $(".tip").html(data).slideDown(1000);
        setTimeout(function(){
            $(".tip").slideUp(1000);
            setTimeout(function(){
                $(".tip").html("");
            },1000);
        },2000);
    };

    function update(){
        $.ajax({
           type:"get",
            dataType:"json",
            url:"./MobiInfo.php?type=1",
            success:function(data){
                if(data.length>0){
                    mobileInfo = data;
                    index = 1;
                    for(i=0;i<data.length;i++){
                        var mobileInstance = data[i];
                        $("#mobileList").append(joinHtml(mobileInstance));
                        index ++;
                    }

                    $(".start").on("click",function(el){
                        var id = $(this).attr("data_id");
                        var browser = "";
                        var url = $(this).parent().parent().find(".url").val();

                        $.each($(this).parent().parent().children().eq(0).find("input"),function(key,el){
                             if($(el).attr("checked")){
                                 if(browser!=""){
                                     browser+="@";
                                 }
                                 browser+=$(el).val()
                             }
                        });

                        if(browser == ""){
                            showtip("必须指定浏览器");
                            return;
                        }

                        if(url == ""){
                            showtip("必须输入url");
                            return;
                        }

                        $.post("./action.php",{
                            id:id,
                            browser:browser,
                            url:url
                        },function(data){
                            showtip(data);
                        });
                    });
                }
            },
            error:function(msg){
                showtip(msg);
            }
        });
    }
    update();
    $(".update").on("click",function(){
        $(".mobile_item").remove();
        update();
    });
});