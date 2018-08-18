# 图片处理

在互联网上，图片是占据流量比例较高的内容媒介之一。人们常说，一图胜千言。图片在网络上主要担任两类职能：一是作为内容本身传递信息，例如新闻类的图片，用户拍摄的照片，电影的海报图片等等；二是作为指示类的辅助标识，例如按钮图标。其中后者是前端开发构建中需要对体积、图片质量、图片数量进行处理的对象，目的通常是为了减少不必要的体积传输、减少 HTTP 请求等，以便加快应用的响应速度。

## 常见图片格式

互联网上的常见图片格式主要有 `gif`、`png`、`apng`、`jpeg`、`svg`、`webp` 等。

<figure>
<img src="./images/image-file-formats.jpg" style="width: 50%;">
<figcaption>W3Techs 给出的网站图片格式分类占比，数据时间是 2018 年 8 月。在所调查的网站中，74.4% 的网站使用了 PNG 图片，72.9% 的网站用到了 JPEG 图片。数据来源：https://w3techs.com/technologies/overview/image_format/all</figcaption>
</figure>

#### GIF

GIF 是 Graphics Interchange Format 的缩写。这种格式于 1987 年出现（比互联网还要早），之后在互联网浪潮兴起后得到了广泛的支持。GIF 格式采用了 LZW（Lempel–Ziv–Welch）无损压缩技术存储图片，LZW 算法在 1985 年开始受到专利保护，这催生了 PNG 标准的诞生（见下文）。2004 年 GIF 相关的专利到期。

GIF 是位图的一种，它使用一个最多可以表达 256 种颜色的表来记录一张图片（一帧）里使用的色彩。对于每个像素，则使用 8 位二进制来表示其颜色值。颜色表可以将真彩色（true color，2<sup>24</sup>种颜色）空间映射到 256 色空间。这种方案在 GIF 诞生的年代非常合理——那时候还很少有硬件设备能够支持 256 种以上的颜色。

在网络图标方面，PNG/SVG 的使用要比 GIF 广泛；真彩色方面的欠缺，不如 JPEG格式。所以，如今 GIF 最大的优势在于良好的支持度以及其将多张图片整合到一起形成动画的能力。前端资源构建流程中，通常很少涉及 GIF 图片的处理。

#### JPEG

JPEG（全称 Joint Photographic Experts Group）是一种常见的数字图像有损压缩（lossy compression）存储格式，它诞生于 1992 年。JPEG 图片通常以 `*.jpg` 或者 `*.jpeg` 作为文件名的后缀。它占据了 MIME 类型中的 `image/jpeg`。JPEG 是 Joint Photographic Experts Group 的缩写。

#### PNG

PNG 是 Portable Network Graphics 的缩写，意为“便携式网络图片”。PNG 格式是作为 GIF 格式的替代方案而提出的，主要原因是 GIF 格式受到专利的保护。PNG 格式支持无损压缩，目前是互联网上使用最广泛的图片无损压缩存储方案。PNG 图片的 MIME 类型通常表示为 `image/png`，并且以 `png` 或者 `PNG` 作为文件名后缀。

PNG 规范在 1997 年的 RFC-2083 中初次进行了阐述。PNG 格式有这样一些特点：

+ 支持 24 位真彩色，并且附加一个 8 位的 alpha 通道（透明度）。所以一个 PNG 图片最高可以表达 32 位的颜色。
+ 无损压缩。这是当年 PNG 为了取代 GIF 而必须完成的设计目标。

具体来说，PNG 有 3 种常用的子格式：PNG8、PNG24、PNG32。PNGcheck 程序<sup>[4]</sup>可以查看一个 PNG 的具体信息，例如在 Mac 系统下：

```bash
# 安装 pngcheck
$ brew install pngcheck

# 查看 pngcheck 程序的版本、作者等基本信息
$ pngcheck
PNGcheck, version 2.3.0 of 7 July 2007,
   by Alexander Lehmann, Andreas Dilger and Greg Roelofs.
   Compiled with zlib 1.2.8; using zlib 1.2.8.
   ... # 省略

# 查看某张图片的信息
$ pngcheck gulp-2x.png
OK: gulp-2x.png (228x510, 32-bit RGB+alpha, non-interlaced, 97.4%).

# 检查某个目录下所有 PNG 图片的信息
$ pngcheck *.png
OK: file-1.png (256x160, 8-bit palette+trns, non-interlaced, 97.6%).
OK: file-2.png (858x660, 32-bit RGB+alpha, non-interlaced, 98.5%).
OK: file-3.png (992x500, 24-bit RGB, non-interlaced, 97.5%).
OK: file-4.png (446x622, 24-bit RGB, non-interlaced, 97.9%).
OK: file-5.png (866x630, 8-bit palette, non-interlaced, 96.9%).
```

PNG 图片的所有相关技术可以在 Greg Roelofs 的《PNG 权威指南》（PNG: The Definitive Guide）<sup>[5]</sup>一书中获得。

#### APNG

APNG 是指动画版的 PNG（Animated Portable Network Graphics），中文名通常叫做**动态 PNG**。APNG 的第 1 帧为标准 PNG 图像，剩余的动画和帧速等数据放在 PNG 扩展数据块里，因此只支持原版 PNG 的软件会正确显示第1 帧。APNG 规范由 Mozilla 公司的 Stuart Parmenter 和 Vladimir Vukićević 在 2004 年创立。目前移动浏览器和除微软家之外的桌面浏览器都支持 APNG 图片格式。总体来说，APNG 的使用还是比较少。

#### Webp

## 交错与非交错图像

在使用 `pngcheck` 检查 PNG 图片信息的时候，可以留意到输出的信息中提到了“non-interlaced”，这是指该图片为非交错格式。交错、非交错图像格式的差异体现在网络的加载上，如下图所示。

<figure>
<img src="./images/interlace-demo.png" style="width: 50%;">
<figcaption>左侧是非交错图片的加载过程，右侧是交错图像的加载过程。通常来说，用户在遇到右侧的加载效果时更愿意等待。</figcaption>
</figure>

## 压缩与内联

### 无损压缩

### 有损压缩

### Base64 内联小尺寸图片

Base64 是一种基于65个字符（26个大写字母 `[A-Z]`，26个小写字母 `[a-z]`，10个阿拉伯数字 `[0-9]`，加号 `+` 和斜杠 `/`，以及用来补位的第65个字符 `=`）来表示二进制数据的编码方法。Base64 编码方案是由 Simon Josefsson 在 2000 年提出的，最初定义在 RFC 1421 和 RFC 2045 里，目前最新的规范是 RFC 4648。

**话题：多小的图片可以考虑使用 base64 进行内联？**

Base64 生成的文件体积为原始图片体积的4/3倍，它对于网站性能优化的提升通常仅针对超小体积的图标类型图片，以体积的稍微增加，来减少 HTTP 的请求次数。那么多小的图片可以考虑使用 base64 进行内联呢？

考虑一个对图片文件的 HTTP/1.1 协议下的请求报文，其由三部分组成：请求行，请求头，请求响应。例如下面是请求行与请求头报文：

```http
GET /piaofang/img/connect/project-bg/bg-00-wide-e4a26031.png?__sprite__ HTTP/1.1
Host: ms0.meituan.net
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1
Accept: image/webp,image/apng,image/*,*/*;q=0.8
Referer: http://ms0.meituan.net/piaofang/css/celebrity/piazza.331e5210.css
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7,zh-TW;q=0.6,da;q=0.5
```

而得到的响应则是：

```http
HTTP/1.1 200 OK
Date: Mon, 04 Dec 2017 08:59:58 GMT
Content-Type: image/png
Content-Length: 4331
Connection: keep-alive
Server: Tengine
Last-Modified: Mon, 04 Dec 2017 06:44:55 GMT
ETag: "5a24eee7-10eb"
Accept-Ranges: bytes
Cache-Control: max-age=2592000,s-maxage=3600
Vary: Accept-Encoding
Access-Control-Allow-Origin: *
X-Ser: BC208_dx-lt-shandong-qingdao-2-cache-7, BC14_lt-fujian-fuzhou-1-cache-1
```

请求头加上请求响应报文，一共 939 字节（记为 `H`）。再加上图片本身的体积，记为 `I` 字节。图片转为 base64 后体积会变为 `4/3 * I` 个字节。如果要问对于多大的 `I`，应该采用 base64 进行转换，就相当于求解满足下面的不等式方程：

```
H + I > 4/3*I
```

可以解得 `I < 3 * H = 2817KB`，即当图片的体积小于 2.8KB 时，使用 base64 进行压缩是会让性能更优的。而且考虑到 HTTP 请求本身的开销（计算资源、建立连接、网络延时等），将这个上限定为 4KB 也是不错的选择。


## 参考资料

1. [GIF | wikipedia](https://en.wikipedia.org/wiki/GIF)
2. [JPEG | wikipedia](https://en.wikipedia.org/wiki/JPEG)
3. PNG 格式规范. https://tools.ietf.org/html/rfc2083
4. pngcheck 官网, http://www.libpng.org/pub/png/apps/pngcheck.html
5. Greg Roelofs. PNG: The Definitive Guide [M]. O'Reilly & Associates, Inc. 1999. 第二版为 HTML 版，发布于 2003 年：http://www.libpng.org/pub/png/book/.
6. [APNG | wikipedia](https://en.wikipedia.org/wiki/APNG)
