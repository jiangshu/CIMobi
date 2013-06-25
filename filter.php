<?php
/**
 * Created by JetBrains PhpStorm.
 * User: jiangshuguang
 * Date: 13-3-29
 * Time: 下午6:55
 * To change this template use File | Settings | File Templates.
 */

?>
<html>
<head>
    <meta charset="utf-8"/>
    <link type="text/css" rel="stylesheet" href="./static/css/common.css"/>
    <link type="text/css" rel="stylesheet" href="./static/css/filter.css"/>
    <script type="text/javascript" src="./static/js/jquery-1.8.2.js"></script>
    <script type="text/javascript" src="./static/js/filter.js"></script>
</head>
<body>
<div class="header">
    <div class="logo"></div>
    <div class="nav">
        <ul>
            <a href="index.php"><li>全部</li></a>
            <a href="filter.php"><li style="background-color: #ffffff;color:#000000">过滤</li></a>
            <a href="down.php"><li>下载</li></a>
        </ul>
    </div>
</div>

<div class="body">
    <div class="filter_content">
        <table width="1100px" align="center">
            <tr>
                <td>
                    <div style="width:550px;float: left;background: #e2e2e2;padding:10px 0 10px 0">
                        <div class="content_title">参数列表</div>
                        <table align="center" cellpadding="15"  width="500"  style=" border-collapse:collapse;table-layout: fixed;word-break: break-all;text-align:center;border-color: #a09128">
                            <tr>
                                <td bgcolor="#ae9c34" style="color:#fff;" width="25%">命令类型</td>
                                <td width="75%">
                                    打开浏览器（目前只支持此命令）
                                </td>
                            </tr>

                            <tr>
                                <td bgcolor="#ae9c34" style="color:#fff;">系统版本</td>

                                <td>
                                    <table width="300px" align="center">
                                        <tr>
                                            <td><input type="checkbox" id="v2_1" value="2\.1" class="sysVersion">2.1</td>
                                            <td><input type="checkbox" id="v2_2" value="2\.2" class="sysVersion">2.2</td>
                                            <td><input type="checkbox" id="v2_3" value="2\.3" class="sysVersion">2.3</td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox" id="v2_3_7" value="2\.3\.7" class="sysVersion">2.3.7</td>
                                            <td><input type="checkbox" id="v4_0" value="4\.0" class="sysVersion">4.0</td>
                                            <td><input type="checkbox" id="v4_0_2" value="4\.0\.2" class="sysVersion">4.0.2</td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox" id="v4_0_4" value="4\.0\.4" class="sysVersion">4.0.4</td>
                                            <td><input type="checkbox" id="v4_1" value="4\.1" class="sysVersion">4.1</td>
                                            <td></td>

                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td bgcolor="#ae9c34" style="color:#fff;" >mobile型号</td>
                                <td>
                                    <table width="300px" align="center" >
                                        <tr>
                                            <td> <input type="checkbox" id="mHTC" value="htc" class="mobileType">HTC</td>
                                            <td><input type="checkbox" id="mZTE" value="zte" class="mobileType">ZTE</td>
                                            <td><input type="checkbox" id="mHUAWEI" value="huawei" class="mobileType">HUAWEI</td>
                                        </tr>
                                        <tr>
                                            <td> <input type="checkbox" id="mMOTOROLA" value="motorola" class="mobileType">MOTOROLA</td>
                                            <td><input type="checkbox" id="mSAMSUNG" value="samsung" class="mobileType">SAMSUNG</td>
                                            <td><input type="checkbox" id="mlenovo" value="lenovo" class="mobileType">lenovo</td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox" id="mMEIZU" value="meizu" class="mobileType">MEIZU</td>
                                            <td><input type="checkbox" id="mDELL" value="dell" class="mobileType">DELL</td>
                                            <td><input type="checkbox" id="mLG" value="lg" class="mobileType">LG</td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox" id="mCOOLPAD" value="coolpad" class="mobileType">COOLPAD</td>
                                            <td><input type="checkbox" id="mMI" value="mi" class="mobileType">MI</td>
                                            <td><input type="checkbox" id="mSONY" value="sony" class="mobileType">SONY</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <tr >
                                <td bgcolor="#ae9c34" style="color:#fff;">浏览器类型</td>
                                <td>
                                    <table width="300px" align="center">
                                        <tr>
                                            <td><input type="checkbox" id="native" value="native" class="browserType">native</td>
                                            <td><input type="checkbox" id="uc" value="uc" class="browserType">uc</td>
                                            <td><input type="checkbox" id="QQ" value="QQ" class="browserType">QQ</td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox" id="chrome" value="chrome" class="browserType">chrome</td>
                                            <td><input type="checkbox" id="opera" value="opera" class="browserType">opera</td>
                                            <td></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td bgcolor="#ae9c34" style="color:#fff;">url</td>
                                <td>
                                    <input type="text" style="width:300px;border:1px solid #a09128" id="url" name="url_url"/>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
                <td>
                    <div style="width:550px;float:left;background: #e2e2e2;padding:10px 0 10px 0">
                        <div class="content_title">
                            mobile列表
                        </div>
                        <div style="width:500px;height:370px;border:1px solid #a09128;margin-left:auto;margin-right:auto;">
                            <table width="450px" align="center" id="filterInfo">
                            </table>
                        </div>

                        <div style="width:500px;margin-left:auto;margin-right: auto;margin-top:20px;text-align:right">
                            <input type="button" value="执行" id="execute1" class="ge_button">
                        </div>
                    </div>

                </td>
            </tr>
        </table>
    </div>

    <div id="log">
        <div class="control"></div>
        <div class="content">
            <ul>
                <li>10:53:26 启动浏览器失败</li>
                <li>10:53:26 启动浏览器失败</li>
                <li>10:53:26 启动浏览器失败</li>
                <li>10:53:26 启动浏览器失败</li>

            </ul>
        </div>
    </div>
</div>



</body>
</html>