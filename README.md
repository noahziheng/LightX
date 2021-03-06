# LightX

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[中文文档](./README_zh.md)

A easy and user-friendly Internet-Of-Thing lamp mobile application for simple interface of bluetooth and TCP.Developed by React Native.

Supported operating systems are >= Android 4.1 (API 16) and iOS platform is on the way.

- [Getting Started](#getting-started)
- [Protocol Documentation](#protocol-documentation)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

LightX is under development and developer is in China which a country block Google,so we only provide a release on Github.You can get apk file from [here](https://github.com/noahziheng/LightX/releases).

## Protocol Documentation

### Connection

 - Bluetooth Device:
    - Need config for slave，PIN is set `0000`
    - SSID need be `LightX-` and your device name or id(It will be shown)
 - Wifi Device:
    - Need config for AP,no password
    - Device IP need be set `192.168.4.1`
    - Device need start TCP server and listen port `5000`
    - SSID need be `LightX-` and your device name or id(It will be shown)

### Data Protocol

Packets of data will make up of hexadecimal 8-bit char.

`3A 00` is start of packet, `FF FA` is end of packet

0. Query current state

> Command is `@`,device need send all command(1-3) to Application when get this command

Example:
 - `3A 00 40 FF FA` Query current state

1. Light On/Of

> Command is `A`,`00` is off,`FF` is on.

Example:
 - `3A 00 41 00 FF FA` Light Off
 - `3A 00 41 FF FF FA` Light On

2. Brightness

> Command is `B`,`00` is daekest,`FF` is lightest.

Example:
 - `3A 00 42 00 FF FA`	Brightness darkest
 - `3A 00 42 55 FF FA`	Brightness darker
 - `3A 00 42 A2 FF FA`	Brightness lighter
 - `3A 00 42 FF FF FA`	Brightness lightest

3. Color temperature

> Command is `C`,`00` is warmest,`FF` is coldest.

Example:
 - `3A 00 43 00 FF FA`	Color temperature warmest
 - `3A 00 43 55 FF FA`	Color temperature warmer
 - `3A 00 43 A2 FF FA`	Color temperature colder
 - `3A 00 43 FF FF FA`	Color temperature coldest

4. Disconnect from APP actively

> Command is `D`, Device need close connection actively.

Example:
 - `3A 00 44 FF FA`	Close connection actively

## Contributing

LightX is under active development,so we welcome PRs.You can pull `dev` branch,and do your improvement.

## License

LightX is [MIT](./LICENSE) licensed.