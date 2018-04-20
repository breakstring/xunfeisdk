# 安装

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
const result = await client.ISE(audio, "基准文字", ISEAueType.RAW, ISELanguageType.EN, ISECategoryType.SENTENCE, ISEResultLevelType.COMPLETE);

// 语音听写(即语音转换为文字)
client.IATAppKey = “语音听写服务的 AppKey”;
const audio = fs.readFileSync(path.join(__dirname, "要转换为文字的音频.wav"));
const result = await client.IAT(audio, IATEngineType.SMS16K_English, IATAueType.RAW);

// 语音合成 (即根据文字来生成音频)
client.TTSAppKey = "语音合成服务的 AppKey";
const result = await client.TTS("科大讯飞的接口文档写的太烂了", TTSAufType.L16_8K, TTSAueType.LAME, TTSVoiceName.XiaoYan);
const mp3 = path.join(__dirname, "要存成的文件.mp3");
fs.writeFileSync(mp3, result.audio, "binary");
```
