---
title: 在Linux上部署Hentai@Home并挂载Onedrive作为其缓存目录
description: Hentai@Home参与的用户都运行一个小型的基于 Java 的客户端，从 E-Hentai 的中心服务器下载画廊的图像并缓存到他们的电脑，并将这些缓存传递给其他浏览画廊的人,借助 Rclone 我们可以将 OneDrive 挂载到本地，从而实现将H@H的缓存存储到OneDrive上
lastUpdated: 2024-12-12
banner: https://rclone.org/img/logo_on_light__horizontal_color.svg
---
## 一、前言
### 1.1什么是Hentai@Home
认识Hentai@Home之前我们先认识下什么是[E-Hentai](https://e-hentai.org/),他是世界上最大的是一个非营利性质的网络图片分享网站之一，网站的主要内容为对日本动漫以及电子游戏等插画、漫画、同人志等内容中获取的电子图片。而为了减轻服务器负担，E-Hentai提供一个名为[Hentai@Home](https://ehwiki.org/wiki/Hentai@Home)的项目(以下简称H@H)。

H@H 是一个可以比作 SETI@home 项目和 BitTorrent 之间交叉的项目。

所有参与的用户都运行一个小型的基于 Java 的客户端，从 E-Hentai 的中心服务器下载画廊的图像并缓存到他们的电脑，并将这些缓存传递给其他浏览 E-Hentai 画廊的人。这使 E-Hentai 能够使用较少的中心服务器带宽提供更多的图像。

客户可以在任何持续时间内自由运行，但建议尽可能长时间地连续运行以获得最大的回报。
### 1.2什么是Onedrive
OneDrive是微软(Microsoft)公司所推出的网络硬盘及云端服务，为了使H@H获取更大的收益，我们需要使用更大的存储空间来作为H@H的缓存，但VPS上存储空间价格昂贵，而微软的[开发人员计划](https://developer.microsoft.com/zh-cn/microsoft-365/dev-program)可以 免费提供最高5T的云存储空间，然后我们使用例如[Rclone](https://rclone.org/)等工具即可让云存储挂载到我们的VPS上
### 1.3什么是 Rclone
[Rclone](https://rclone.org/)是一个开源的命令行工具，它可以用于在本地和各种云存储之间同步文件。它支持 50 多种云存储，包括 Dropbox、Google Drive、OneDrive、Amazon S3、Backblaze B2、OpenStack Swift、Hubic、Yandex Disk 等等。

借助 Rclone 我们可以将 OneDrive 挂载到本地，从而实现将H@H的缓存存储到OneDrive上。
## 二、准备工作
> 在开始部署之前，为了节约时间，你已经：
> - 具有Linux命令行知识
> - 拥有大容量OneDrive的Microsoft账号
> - 拥有E-Hentai账号，了解H@H原理
> - 拥有一台VPS主机，并且它同时与H@H和 Onedrive 连接状况良好
### 2.1申请H@H客户端配额
如果你是首次加入Hentai@Home，那么登录论坛，在此页面应该有一个[申请地址](https://e-hentai.org/hentaiathome.php)  
最低要求目前是，1个独立ipv4，尽量24小时可持续在线的服务器/vps之类的，6个月至少在线率75%以上，50mbps峰值带宽，300MB/hour的流量要求，10GB以上硬盘。

申请最重要的要求就是需要一个客户端测速结果，推荐使用[speedtest](https://www.speedtest.net/)，下文也以其为例。

Ubuntu系统下，我们安装下Speedtest测试工具

```shell
apt install speedtest-cli
speedtest-cli --share
```

> root@ub-1: <u>**apt install speedtest-cli**</u>
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following NEW packages will be installed:
  speedtest-cli
0 upgraded, 1 newly installed, 0 to remove and 11 not upgraded.
Need to get 24.0 kB of archives.
After this operation, 106 kB of additional disk space will be used.
Get:1 http://azure.archive.ubuntu.com/ubuntu focal-updates/universe amd64 speedtest-cli all 2.1.2-2ubuntu0.20.04.1 [24.0 kB]
Fetched 24.0 kB in 0s (775 kB/s)   
Selecting previously unselected package speedtest-cli.
(Reading database ... 116974 files and directories currently installed.)
Preparing to unpack .../speedtest-cli_2.1.2-2ubuntu0.20.04.1_all.deb ...
Unpacking speedtest-cli (2.1.2-2ubuntu0.20.04.1) ...
Setting up speedtest-cli (2.1.2-2ubuntu0.20.04.1) ...
Processing triggers for man-db (2.9.1-1) ...
root@ub-1: <u>**speedtest-cli --share**</u>
Retrieving speedtest.net configuration...
Testing from Microsoft Corporation (20.205.116.25)...
Retrieving speedtest.net server list...
Selecting best server based on ping...
Hosted by *********
Testing download speed................................................................................
Download: ********* Mbit/s
Testing upload speed......................................................................................................
Upload: ********* Mbit/s
**Share results:** http://www.speedtest.net/result/******.png

将最后分享结果网址复制粘贴到申请栏，填写好其他相关信息，提交即可。等待1-2天，进入H@H页面如果看到offline的client配额，点击名字修改配置即可。
### 2.2运行环境安装
在等待申请通过期间，我们可以先将H@H与Rclone的运行环境准备好
H@H的运行环境为Java 8及以上，我们使用命令行安装
```shell
apt instal default-jre
```

安装完成后我们输入指令查看是否已安装完成
```shell
java --version
```

配置bbr加速模块，两行相关bbr配置开关即可，通过`sysctl -p`查看是否生效

```
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
```

安装Rclone运行环境

```shell
apt install rclone
```
### 2.3获取 OneDrive 的`client_id`和`client_secret`
请参考这篇博客：[创建微软OneDrive API](https://333rd.net/posts/tech/%E5%88%9B%E5%BB%BA%E5%BE%AE%E8%BD%AFonedrive-api/)
最终你将拿到你的`client_id`和`client_secret`。

拿到后在你的电脑上[下载](https://rclone.org/downloads/)Rclone（因为必须使用浏览器进行 OAuth），然后执行下面的命令，并按照你的实际`client_id`与`client_secret`填入：
```shell
rclone authorize "onedrive" -- "client_id" "client_secret"`
```
此时，Rclone 会在浏览器中打开一个网页，要求你登录你的 Microsoft 账号。

如果你能正常在控制台中看到你的 token：
`token = {"access_token":"xxxxxxxxxxxxxxxxxx","expiry":"yyyyyyyyyyyyyyyy"}`
记录该 token 备用。
## 三、配置Rclone
至此你已经获得：
- `client_id``
- `client_secret`
- `access_token`
- `H@H配额`
在你的云服务器上执行：

```shell
rclone config
```
会出现：
> e) Edit existing remote
> n) New remote
> d) Delete remote
> r) Rename remote
> c) Copy remote
> s) Set configuration password
> q) Quit config
> e/n/d/r/c/s/q>

选择`n`，新建一个，并将该新 remote 命名，假设我们命名为`hath`。
之后会出现：
> Type of storage to configure.
> Enter a string value. Press Enter for the default ("").
> Choose a number from below, or type in your own value
> 
> 22 / Microsoft OneDrive
>    \ "onedrive"
> 
> Storage>

不同版本 Rclone 的数字可能不同，我这里的 Microsoft OneDrive 对应的是 22，所以输入 22。
之后将要求输入你的`client_id`和`client_secret`：
> OAuth Client Id
> Leave blank normally.
> Enter a string value. Press Enter for the default ("").
> client_id>

复制你的`client_id`即可。
> OAuth Client Secret
> Leave blank normally.
> Enter a string value. Press Enter for the default ("").
> client_secret>

复制你的`client_secret`即可。
之后会出现：
> Edit advanced config? (y/n) y) Yes n) No (default)

选择`n`，不需要编辑高级配置。
> Remote config
> Use auto config?
>  * Say Y if not sure
>  * Say N if you are working on a remote or headless machine
> y) Yes (default)
> n) No
> y/n>


因为我们是在云服务器上配置，所以选择`n`。此时 Rclone 会要求你输入你的`access_token`：
> For this to work, you will need rclone available on a machine that has
> a web browser available.
> 
> For more help and alternate methods see: https://rclone.org/remote_setup/
> 
> Execute the following on the machine with the web browser (same rclone
> version recommended):
> 
>         rclone authorize "onedrive"
> 
> Then paste the result below:
> result>

复制你先前保存的`access_token`即可。
之后会出现：
> Choose a number from below, or type in an existing value
>  1 / OneDrive Personal or Business
>    \ "onedrive"
>  2 / Sharepoint site
>    \ "sharepoint"
>  3 / Type in driveID
>    \ "driveid"
>  4 / Type in SiteID
>    \ "siteid"
>  5 / Search a Sharepoint site
>    \ "search"
> Your choice>

视你自己情况而定。之后你将获得一个已经配置好的 remote。

创建一个新文件夹用于挂载，具体路径完全取决于你个人：
```shell
mkdir /root/rclone
mkdir /root/rclone/hath
```
然后再在你的 OneDrive 网页版中，于根目录下创建一个文件夹，命名为`Hath`。
使用以下命令挂载：
```shell
rclone mount od4hath:Hath /root/rclone/od4hath --allow-other --transfers 4 --buffer-size 32M --vfs-read-chunk-size 128M --vfs-read-chunk-size-limit 0M --vfs-cache-max-size 8000M --vfs-cache-max-age 3360h --allow-non-empty --dir-cache-time 3360h --vfs-cache-mode full --umask 000 --vfs-cache-mode full --no-modtime --vfs-cache-poll-interval 30m
```

## 四、与H@H一起运行
首先我们在挂载目录中添加一个`cache`文件夹作为缓存文件夹：
```shell
mkdir /root/rclone/hath/cache
```
然后配置H@H
```shell
wget https://repo.e-hentai.org/hath/HentaiAtHome_1.6.1.zip
```
然后解压到喜欢的目录：
```shell
unzip HentaiAtHome_1.6.1.zip -d /home/hath/
```
执行  `--cache-dir`参数指定缓存目录
```shell
java -jar HentaiAtHome.jar --cache-dir=/root/rclone/hath/cache
```
提示`Successfun`即完成所有配置操作