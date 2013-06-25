CIMobi
======

android持续集成框架


** 概述：
CIMobile提供了一种移动端的持续集成自动化测试框架，目前支持android系统，此工具可以实现 实时或定时的在多个测试mobile的不同浏览器同时执行case。
框架实现了自动统计mobile浏览器列表，自动获取mobile由于wifi环境变化或者异常造成的ip变化，根据条件刷选mobile，并能根据设置的url，启动对应的浏览器打开url对应的page。
此工具不仅适合前端的QA，同时也适合于web开发人员，可以给定url，启动特定mobile的特定浏览器，辅助开发。


** 工具的特色
  此工具能满足传统持续集成的需求，并且具有以下特色。
  （1） 自动寻找mobile上安装的浏览器，省去查找统计各mobile的安装的浏览器类型的步骤，工具提供的查看的功能。
  （2） 当mobile重连wifi，ip会重新自动分配，当ip变化了，不需要手动修改配置，CImobile会自动重新获取mobile的ip
  （3）可以根据条件（mobile型号、系统的版本、浏览器类型、app自动分配的id以及别名）刷选对应的mobile，方便灵活
  （4） 批量操作，只需要指定筛选条件和url，就可以在所有满足条件的mobile运行case。
  （5） 此工具同样适应于Fe开发人员，可以给定url，启动特定mobile的特定浏览器，一键搞定，不需要输入一大串的url，也不需要二维码。
  （6） 除了通过命令行的形式使用工作，同样提供ui的方式，简单方便。

** 基本原理
    服务端启动一个服务，监听某个端口。mobile端通过app主动连接服务器端，
    并且将自身的信息（ip、类型、系统版本等）信息主动提交给服务端服务端管理所有的当前在线的mobile。
    服务器端接收命令（纯命令 or ui），将命令转发给目标mobile，目标mobile中的啊app接收命令并执行命令。

** 使用方法：

1. 下载&安装&配置手机app
    （1）在下载页通过链接直接下载或者通过二维码下载CIMobi.apk,并安装
    （2）对app进行配置
         服务器IP：即2中监听的服务器的IP
         端口：可以使用默认端口，也可以根据2中的服务器监听端口配置
         机器别名：最好取易识别的唯一的别名
    （3）配置好后先保存，然后通过点击连接，然后log中显示“服务器连接成功”则可以正常使用，如果连接不成功会有相应的提示

2.启动监听服务器
     （1）下载CIMobile_Server.jar，通过java -jar CIMobile_Server.jar 启动监听服务器
          默认的端口为3204，如果需要改变端口，可以通过阐述 port=8801指定
     （2）同级目录的log文件可以查看系统日志，包括连接的状态及命令的执行情况等

3.执行命令
  执行命令分两种情况：
  (1) 纯命令行形式：
      java -jar CIMobile_Cmd.jar
            ip=172.22.184.118       //监听服务器的ip
            port=3204               //监听服务器监听的端口
            action=openBrowser      //命令的类型目前只支持openBrowser类型
            browser=native&chrome   //浏览器类型
           【androidVersion=4.2.2 mobileType=htc  id=123 alias=mobile】 //可选项，组合的筛选条件
            isAll=true              //命令是否作用在所有满足刷选条件的mobile上
            url=http://www.163.com  //浏览器启动的url
  （2）ui方式
      a."全部“page中有所有的当前可操作的的mobile，选择浏览器，然后填入url，单击“启动”按钮，就可以启动相应的浏览器
      b."过滤“page可以通过条件的组合刷选出满足条件的mobile，然后可以进行相应的动作。

  *注：如果在CI中使用此工具，可以通过写以一个shell脚本执行命令行执行，或者通过其它形式执行配置参数执行命令行即可。

** 使用场景：
   1.FE开发
    a.单选方式：选择浏览器，然后填入url，单击“启动”按钮，就可以启动相应的浏览器
    b.多选（筛选）方式：条件的组合刷选出满足条件的mobile，然后填入url执行启动操作

   2.持续集成模式引入
     （1）php测试框架
       $cmd = "java -jar CIMobile_Cmd.jar ip=172.22.184.118 port=3204 action=openBrowser alias=mobile1  browser=uc&native url=http://www.baidu.com";
        PassThru($cmd);
     （2）shell方式
java -jar CIMobile_Cmd.jar ip=172.22.184.118 port=3204 action=openBrowser alias=mobile1  browser=uc&native url=http://www.baidu.com
  ** 后续完善计划
  1.截图：
     通过观察程序运行的中间状态，往往也是一种确定程序正确性的方法，后续计划能自由控制或者通过设置时间间隔截取屏幕，并且能保存截图图片，
     方面查看。
  2.js通知，任务调度
     android前端只能有一个程序运行，所以不能同时在多浏览器运行case，但可以串行在浏览器中运行case，在所有case跑完后，
     往往可以通过js发送一个结束的消息，后续计划在app上接收js发出的消息，智能调度其它浏览器，满足多浏览串行运行case的需求；