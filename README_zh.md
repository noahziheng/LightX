# LightX

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[English Documention](./README.md)

一个易用的物联网台灯APP，具有一点简单的蓝牙或TCP接口，使用React Native开发。

支持Android 4.1(API 16)以上，iOS平台正在开发中。

- [开始使用](#getting-started)
- [协议文档](#protocol-documentation)
- [为项目贡献](#contributing)
- [协议](#license)

## 开始使用
<span id="getting-started"></span>

因为 LightX 正在开发中且国内访问 Google Play 存在政策问题，所以我们将 apk 文件托管在 Github，点击[这里](https://github.com/noahziheng/LightX/releases)下载。

## 协议文档
<span id="protocol-documentation"></span>

### 连接相关

 - 蓝牙设备：
    - 设备需配置为从机,PIN为 `0000`
    - SSID 需要以 `LightX-` 开头，后接你计划显示的设备名或ID
 - Wifi设备：
    - 设备需配置为AP模式,无密码
    - 设备IP应被设为 `192.168.4.1`
    - 设备应初始化TCP服务器并监听 `5000` 端口
    - SSID 需要以 `LightX-` 开头，后接你计划显示的设备名或ID

### 数据协议

数据包流将使用8位char字符形式传递，以下使用16进制形式表示。

`3A 00` 作为包头, `FF FA` 作为包尾。

0. 查询当前状态

> 指令为 `@`，设备需在收到此命令后使用后述1-3指令将当前各项目的值发送到APP端

例如：
 - `3A 00 40 FF FA` 查询当前状态


1. 开关灯

> 指令为 `A`,`00` 代表关灯,`FF` 代表开灯

例如：
 - `3A 00 41 00 FF FA` 关灯
 - `3A 00 41 FF FF FA` 开灯

2. 亮度调整

> 指令为 `B`,`00` 代表最暗,`FF` 代表最亮

例如：
 - `3A 00 42 00 FF FA`	亮度最暗
 - `3A 00 42 55 FF FA`	亮度较暗
 - `3A 00 42 A2 FF FA`	亮度较亮
 - `3A 00 42 FF FF FA`	亮度最亮

3. 色温调整

> 指令为 `C`,`00` 代表最暖,`FF` 代表最冷

例如：
 - `3A 00 42 00 FF FA`	色温最暖
 - `3A 00 42 55 FF FA`	色温较暖
 - `3A 00 42 A2 FF FA`	色温较冷
 - `3A 00 42 FF FF FA`	色温最冷

## 为项目贡献
<span id="contributing"></span>

LightX 正在进行积极地开发中，我们欢迎大家提出PR，可以拉取 `dev` 分支，然后提交你的更改。

## 开源协议
<span id="license"></span>

LightX 使用 [MIT](./LICENSE) 协议开源。