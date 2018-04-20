import chai from "chai";
import fs from "fs";
import * as mocha from "mocha";
import path from "path";
import * as Xunfei from "../dist";
import { IATAueType, IATEngineType, ISEAueType, ISECategoryType, ISELanguageType, ISEResultLevelType, TTSAueType, TTSAufType, TTSEngineType, TTSVoiceName } from "../dist";
import * as config from "./config";

const should = chai.should();
const EN_16K_SAMPLE = "EN_16.wav";
const EN_CONTENT = "The bear is on top";
const CN_16K_SAMPLE = "CN_16.wav";
const CN_CONTENT = "今天天气不错";
const BIG_SAMPLE = "BIG.wav";

const TTS_CN_MP3_16 = "tts_cn_mp3_16.mp3";
const TTS_CN_WAV_16 = "tts_cn_wav_16.wav";
const TTS_CN_MP3_8 = "tts_cn_mp3_8.mp3";
const TTS_CN_WAV_8 = "tts_cn_wav_8.wav";
const TTS_EN_MP3_16 = "tts_en_mp3_16.mp3";
const TTS_EN_WAV_16 = "tts_en_wav_16.wav";
const TTS_EN_MP3_8 = "tts_en_mp3_8.mp3";
const TTS_EN_WAV_8 = "tts_en_wav_8.wav";
let client: Xunfei.Client;

before("实例化讯飞客户端", (done) => {
    client = new Xunfei.Client(config.AppID);
    done();
});

describe("语音评测", async () => {
    it("评测英文句子,获取完整结果", async () => {
        client.AppID = config.AppID;
        client.ISEAppKey = config.ISEAppKey;
        const audio = fs.readFileSync(path.join(__dirname, EN_16K_SAMPLE));
        const result = await client.ISE(audio, EN_CONTENT, ISEAueType.RAW, ISELanguageType.EN, ISECategoryType.SENTENCE, ISEResultLevelType.COMPLETE);
        chai.expect(result).property("code", "0");
    });
    it("评测中文句子，获取完整结果", async () => {
        client.AppID = config.AppID;
        client.ISEAppKey = config.ISEAppKey;
        const audio = fs.readFileSync(path.join(__dirname, CN_16K_SAMPLE));
        const result = await client.ISE(audio, CN_CONTENT, ISEAueType.RAW, ISELanguageType.CN, ISECategoryType.SENTENCE, ISEResultLevelType.COMPLETE);
        chai.expect(result).property("code", "0");
    });
    it("评测英文句子,获取精简结果", async () => {
        client.AppID = config.AppID;
        client.ISEAppKey = config.ISEAppKey;
        const audio = fs.readFileSync(path.join(__dirname, EN_16K_SAMPLE));
        const result = await client.ISE(audio, EN_CONTENT, ISEAueType.RAW, ISELanguageType.EN, ISECategoryType.SENTENCE, ISEResultLevelType.PLAIN);
        chai.expect(result).property("code", "0");
    });
    it("评测中文句子，获取精简结果", async () => {
        client.AppID = config.AppID;
        client.ISEAppKey = config.ISEAppKey;
        const audio = fs.readFileSync(path.join(__dirname, CN_16K_SAMPLE));
        const result = await client.ISE(audio, CN_CONTENT, ISEAueType.RAW, ISELanguageType.CN, ISECategoryType.SENTENCE, ISEResultLevelType.PLAIN);
        chai.expect(result).property("code", "0");
    });
});

describe("语音合成", async () => {
    it("合成中文 16K mp3", async () => {
        client.AppID = config.AppID;
        client.TTSAppKey = config.TTSAppKey;
        const result = await client.TTS("科大讯飞的接口文档写的太烂了", TTSAufType.L16_16K, TTSAueType.LAME, TTSVoiceName.XiaoYan);
        chai.expect(result).property("audio");
        const mp3 = path.join(__dirname, TTS_CN_MP3_16);
        fs.writeFileSync(mp3, result.audio, "binary");
    });
    it("合成中文 16K wav", async () => {
        client.AppID = config.AppID;
        client.TTSAppKey = config.TTSAppKey;
        const result = await client.TTS("科大讯飞的接口文档写的太烂了", TTSAufType.L16_16K, TTSAueType.RAW, TTSVoiceName.XiaoYan);
        chai.expect(result).property("audio");
        const wav = path.join(__dirname, TTS_CN_WAV_16);
        fs.writeFileSync(wav, result.audio, "binary");
    });
    it("合成中文 8K mp3", async () => {
        client.AppID = config.AppID;
        client.TTSAppKey = config.TTSAppKey;
        const result = await client.TTS("科大讯飞的接口文档写的太烂了", TTSAufType.L16_8K, TTSAueType.LAME, TTSVoiceName.XiaoYan);
        chai.expect(result).property("audio");
        const mp3 = path.join(__dirname, TTS_CN_MP3_8);
        fs.writeFileSync(mp3, result.audio, "binary");
    });
    it("合成中文 8K wav", async () => {
        client.AppID = config.AppID;
        client.TTSAppKey = config.TTSAppKey;
        const result = await client.TTS("科大讯飞的接口文档写的太烂了", TTSAufType.L16_8K, TTSAueType.RAW, TTSVoiceName.XiaoYan);
        chai.expect(result).property("audio");
        const wav = path.join(__dirname, TTS_CN_WAV_8);
        fs.writeFileSync(wav, result.audio, "binary");
    });

    it("合成英文 16K mp3", async () => {
        client.AppID = config.AppID;
        client.TTSAppKey = config.TTSAppKey;
        const result = await client.TTS("JavaScript sucks!", TTSAufType.L16_16K, TTSAueType.LAME, TTSVoiceName.XiaoYan, 50, 100, 50, TTSEngineType.INTP65EN);
        chai.expect(result).property("audio");
        const mp3 = path.join(__dirname, TTS_EN_MP3_16);
        fs.writeFileSync(mp3, result.audio, "binary");
    });
    it("合成英文 16K wav", async () => {
        client.AppID = config.AppID;
        client.TTSAppKey = config.TTSAppKey;
        const result = await client.TTS("JavaScript sucks!", TTSAufType.L16_16K, TTSAueType.RAW, TTSVoiceName.XiaoYan, 50, 100, 50, TTSEngineType.INTP65EN);
        chai.expect(result).property("audio");
        const wav = path.join(__dirname, TTS_EN_WAV_16);
        fs.writeFileSync(wav, result.audio, "binary");
    });
    it("合成英文 8K mp3", async () => {
        client.AppID = config.AppID;
        client.TTSAppKey = config.TTSAppKey;
        const result = await client.TTS("JavaScript sucks!", TTSAufType.L16_8K, TTSAueType.LAME, TTSVoiceName.XiaoYan, 50, 100, 50, TTSEngineType.INTP65EN);
        chai.expect(result).property("audio");
        const mp3 = path.join(__dirname, TTS_EN_MP3_8);
        fs.writeFileSync(mp3, result.audio, "binary");
    });
    it("合成中文 8K wav", async () => {
        client.AppID = config.AppID;
        client.TTSAppKey = config.TTSAppKey;
        const result = await client.TTS("科大讯飞是中国最大的智能语音技术提供商", TTSAufType.L16_8K, TTSAueType.RAW, TTSVoiceName.XiaoYan, 50, 100, 50, TTSEngineType.INTP65EN);
        chai.expect(result).property("audio");
        const wav = path.join(__dirname, TTS_EN_WAV_8);
        fs.writeFileSync(wav, result.audio, "binary");
    });
});

describe("语音听写", async () => {
    it("错误的 AppKey 会有有错误返回", async () => {
        client.AppID = config.AppID;
        client.IATAppKey = config.AppID;
        const audio = fs.readFileSync(path.join(__dirname, EN_16K_SAMPLE));
        const result = await client.IAT(audio, IATEngineType.SMS16K_English, IATAueType.RAW);
        chai.expect(result).property("code", "10105");
    });
    it("错误的 AppID 也不行", async () => {
        client.AppID = config.IATAppKey;
        client.IATAppKey = config.IATAppKey;
        const audio = fs.readFileSync(path.join(__dirname, EN_16K_SAMPLE));
        const result = await client.IAT(audio, IATEngineType.SMS16K_English, IATAueType.RAW);
        chai.expect(result).property("code", "10105");
    });
    it("测试一个英语短句", async () => {
        client.AppID = config.AppID;
        client.IATAppKey = config.IATAppKey;
        const audio = fs.readFileSync(path.join(__dirname, EN_16K_SAMPLE));
        const result = await client.IAT(audio, IATEngineType.SMS16K_English, IATAueType.RAW);
        chai.expect(result).property("code", "0");
    });
    it("测试一个普通话短句", async () => {
        client.AppID = config.AppID;
        client.IATAppKey = config.IATAppKey;
        const audio = fs.readFileSync(path.join(__dirname, CN_16K_SAMPLE));
        const result = await client.IAT(audio, IATEngineType.SMS16K_Mandarin, IATAueType.RAW);
        chai.expect(result).property("code", "0");
    });
    /*
    it("测试一个超长音频会返回错误", async () => {
        client.AppID = config.AppID;
        client.IATAppKey = config.IATAppKey;
        const audio = fs.readFileSync(path.join(__dirname, BIG_SAMPLE));
        const result = await client.IAT(audio, IATEngineType.SMS16K_Mandarin, IATAueType.RAW);
        chai.expect(result).property(
            "code",
            "10109",
            "理论上编码后超过2M的音频会返回10109错误，但是讯飞这不靠谱的开发人员没有按照文档来做。。。我有啥办法呢？\
            \n还是把这个测试用例保留，万一哪天他们脑袋抽抽又返回错误代码了呢？\
            \n参见： http:;// doc.xfyun.cn/rest_api/%E8%AF%AD%E9%9F%B3%E5%90%AC%E5%86%99.html\n");
    });
    */
});
