# HTTP抓包、代理工具

在 Web 开发与调试中，开发人员经常需要抓取、修改或者代理 HTTP 请求，这些功能需要借助于一系列 HTTP 抓包/代理工具来完成。这些工具包括在 Mac 平台下的 Charles，Windows 平台下的 Fiddler，以及跨平台的 Whistle 等等。

## Chrome 扩展：SwitchyOmega

如果只是希望代理 Chrome 浏览器的请求，例如希望能够自动将所有的发往 `a.test.com/pages` 的请求代理到本地 `localhost:3000`，那么可以使用 Chrome 扩展工具来完成。这里推荐使用 SwitchyOmega。SwitchyOmega 是一款开源自由软件（[代码地址](https://github.com/FelisCatus/SwitchyOmega)），使用 GNU General Public License 版本 3 及以上授权。

<img src="./images/switchy-omega-01.png" class="rounded" style="width: 460px;" />

## Charles

[Charles](https://www.charlesproxy.com/) 是一款收费的 HTTP 代理工具，在 Windows/Mac/Linux 三个平台下都有对应的安装包。

## Fiddler

## Whistle

[Whistle](https://github.com/avwo/whistle) 是一个 Github 开源项目，基于 Node.js 开发。



