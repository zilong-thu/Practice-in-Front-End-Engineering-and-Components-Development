# 图片处理

在互联网上，图片是占据流量比例较高的内容媒介之一。人们常说，一图胜千言。图片在网络上主要担任两类职能：一是作为内容本身传递信息，例如新闻类的图片，用户拍摄的照片，电影的海报图片等等；二是作为指示类的辅助标识，例如按钮图标。其中后者是前端开发构建中需要对体积、图片质量、图片数量进行处理的对象，目的通常是为了减少不必要的体积传输、减少 HTTP 请求等，以便加快应用的响应速度。

## 常见图片格式

互联网上的常见图片格式主要有 `gif`、`png`、`apng`、`jpg`/`jpeg`、`webp` 等。

#### Gif

GIF 是 Graphics Interchange Format 的缩写。

#### PNG

PNG 是 Portable Network Graphics 的缩写，意为“便携式网络图片”。PNG 格式是作为 gif 格式的替代方案而提出的，原因是 gif 格式受到专利的保护。PNG 格式支持无损压缩，目前是互联网上使用最广泛的图片无损压缩存储方案。PNG 图片的 MIME 类型通常表示为 `image/png`，并且以 `png` 或者 `PNG` 作为文件名后缀。

PNG 规范在 1997 年的 RFC-2083 中初次进行了阐述。PNG 格式有这样一些特点：

+ 支持 24 位颜色，并且附加一个 8 位的 alpha 通道（透明度）。所以一个 PNG 图片最高可以表达 32 位的颜色。
+ 无损压缩

#### APNG

APNG 是指动画版的 PNG（Animated Portable Network Graphics）。

#### JPEG

JPEG 是一种常见的数字图像有损压缩（lossy compression）存储格式。JPEG 图片通常以 `*.jpg` 或者 `*.jpeg` 作为文件名的后缀。它占据了 MIME 类型中的 `image/jpeg`。JPEG 是 Joint Photographic Experts Group 的缩写。

#### Webp

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

1. PNG 格式规范. https://tools.ietf.org/html/rfc2083
2. [APNG | wikipedia](https://en.wikipedia.org/wiki/APNG)
3. [JPEG | wikipedia](https://en.wikipedia.org/wiki/JPEG)
