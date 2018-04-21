# xunfeisdk
科大讯飞 Web API 的 NodeJS 版封装。


[![Build Status](https://travis-ci.org/breakstring/xunfeisdk.svg?branch=master)](https://travis-ci.org/breakstring/xunfeisdk)
[![npm version](https://badge.fury.io/js/xunfeisdk.svg)](https://badge.fury.io/js/xunfeisdk)
[![Open Source Helpers](https://www.codetriage.com/breakstring/xunfeisdk/badges/users.svg)](https://www.codetriage.com/breakstring/xunfeisdk) [![Known Vulnerabilities](https://snyk.io/test/github/breakstring/xunfeisdk/badge.svg?targetFile=package.json)](https://snyk.io/test/github/breakstring/xunfeisdk?targetFile=package.json)
[![GitHub stars](https://img.shields.io/github/stars/breakstring/xunfeisdk.svg)](https://github.com/breakstring/xunfeisdk/stargazers)
[![GitHub license](https://img.shields.io/github/license/breakstring/xunfeisdk.svg)](https://github.com/breakstring/xunfeisdk/blob/master/LICENSE)

[![NPM](https://nodei.co/npm/xunfeisdk.png)](https://npmjs.org/package/xunfeisdk)
## 特点
- TypeScript 源代码, 带 .d.ts 类型定义。 可方便的用于 TS 或者 NodeJS项目中。
- Promise 型方法，支持 async / await 语句访问。 

## 安装

```npm
npm install xunfeisdk
```

or

```shell
git clone https://github.com/breakstring/xunfeisdk.git
cd xunfeisdk
npm install
```

## 官方 WebAPI 接口

<http://doc.xfyun.cn/rest_api/>

## 测试

```shell
cd test
cp config_template.ts config.ts
# 修改你的 AppID 和各个 AppKey
# 别忘了去加你的IP地址到控制台的白名单
npm run test
```

## 使用

``` Javascript
import * as Xunfei from "xunfeisdk";
import { IATAueType, IATEngineType, ISEAueType, ISECategoryType, ISELanguageType, ISEResultLevelType, TTSAueType, TTSAufType, TTSEngineType, TTSVoiceName } from "xunfeisdk";



const client = new Xunfei.Client("Your AppID");
// 语音评测服务（根据基准文字给语音朗读打分）
client.ISEAppKey = "语音评测的 AppKey";
const audio = fs.readFileSync(path.join(__dirname, "评测文件.wav"));
try {
    const result = await client.ISE(audio, "基准文字", ISEAueType.RAW, ISELanguageType.EN, ISECategoryType.SENTENCE, ISEResultLevelType.COMPLETE);

} catch (error) {
    // Oops...
}


// 语音听写(即语音转换为文字)
client.IATAppKey = “语音听写服务的 AppKey”;
const audio = fs.readFileSync(path.join(__dirname, "要转换为文字的音频.wav"));
try{
    const result = await client.IAT(audio, IATEngineType.SMS16K_English, IATAueType.RAW);
} catch (error) {
    // Oops...
}

// 语音合成 (即根据文字来生成音频)
client.TTSAppKey = "语音合成服务的 AppKey";
try {
    const result = await client.TTS("科大讯飞的接口文档写的太烂了", TTSAufType.L16_8K, TTSAueType.LAME, TTSVoiceName.XiaoYan);
    const mp3 = path.join(__dirname, "要存成的文件.mp3");
    fs.writeFileSync(mp3, result.audio, "binary");
} catch (error) {
    // Oops...
}
```
