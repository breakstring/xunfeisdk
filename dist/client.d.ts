/// <reference types="node" />
import { ICommonResponseBody, ITTSResponseBody } from "./responsemessage";
export declare class Client {
    /**
     * 语音听写服务请求地址
     * @type {string}
     * @memberof Client
     */
    IATServiceEndPoint: string;
    /**
     * 语音合成服务请求地址
     * @type {string}
     * @memberof Client
     */
    TTSServiceEndPoint: string;
    /**
     * 语音评测服务请求地址
     * @type {string}
     * @memberof Client
     */
    ISEServiceEndPoint: string;
    /**
     * 应用ID
     *
     * @type {string}
     * @memberof Client
     */
    AppID: string;
    /**
     * 代理服务器
     *
     * @type {IProxyConfig}
     * @memberof Client
     */
    Proxy?: IProxyConfig;
    /**
     * 语音听写服务 AppKey
     *
     * @type {string}
     * @memberof Client
     */
    IATAppKey?: string;
    /**
     * 语音合成 AppKey
     *
     * @type {string}
     * @memberof Client
     */
    TTSAppKey?: string;
    /**
     * 语音评测 AppKey
     *
     * @type {string}
     * @memberof Client
     */
    ISEAppKey?: string;
    /**
     * 建立一个讯飞 WebAPI 客户端实例
     * @param {string} appid 应用程序 AppID
     * @param {string} [iatappkey] 语音听写服务的 AppKey
     * @param {string} [ttsappkey] 语音合成服务的 AppKey
     * @param {string} [iseappkey] 语音评测服务的 AppKey
     * @memberof Client
     */
    constructor(appid: string, iatappkey?: string, ttsappkey?: string, iseappkey?: string);
    /**
     * 语音合成请求
     * @param {string} text 要合成的文本
     * @param {(TTSAufType | string)} auf 音频采样率
     * @param {(TTSAueType | string)} aue 音频编码格式
     * @param {(TTSVoiceName | string)} voicename 发音人
     * @param {number} [speed] 语速，可选值[0~100]，默认50
     * @param {number} [volume] 音量，可选值[0~100]，默认50
     * @param {number} [pitch] 音高，可选值[0~100]，默认50
     * @param {(TTSEngineType | string)} [enginetype] 引擎类型，默认为 inpt65
     * @param {(TTSTextType | string)} [texttype] 文本类型，默认为 text
     * @returns {Promise<ITTSResponseBody>}
     * @memberof Client
     */
    TTS(text: string, auf: TTSAufType | string, aue: TTSAueType | string, voicename?: TTSVoiceName | string, speed?: number, volume?: number, pitch?: number, enginetype?: TTSEngineType | string, texttype?: TTSTextType | string): Promise<ITTSResponseBody>;
    /**
     * 语音识别
     * @param {(any[] | Buffer | ArrayBuffer)} audio 音频数据。
     * @param {(IATEngineType | string)} enginetype 引擎类型，例如：sms16k（16k采样率普通话音频）、sms8k（8k采样率普通话音频）等，其他参见引擎类型说明
     * @param {(IATAueType | string)} aue 音频编码，可选值：raw（未压缩的pcm或wav格式）、speex（speex格式）、speex-wb（宽频speex格式）
     * @param {(string | number)} [speexsize] speex音频帧率，speex音频必传
     * @param {string} [scene] 情景模式
     * @param {number} vadeos 后端点检测（单位：ms），默认1800
     * @returns {Promise<IResponseBody>} 讯飞返回的信息
     * @memberof Client
     */
    IAT(audio: any[] | Buffer | ArrayBuffer, enginetype: IATEngineType | string, aue: IATAueType | string, speexsize?: string | number, scene?: string, vadeos?: number): Promise<ICommonResponseBody>;
    /**
     * 语音评测
     *
     * @param {(any[] | Buffer | ArrayBuffer)} audio 音频数据
     * @param {string} text 要对比的文本
     * @param {(ISEAueType | string)} aue 音频编码，可选值：raw（未压缩的 pcm 格式音频）、speex
     * @param {(ISELanguageType | string)} language 评测语种，可选值： en（英语）、cn（汉语）
     * @param {(ISECategoryType | string)} category 评测题型，可选值： read_syllable（单字朗读，汉语专有）、 read_word（词语朗读）、 read_sentence（句子朗读）、read_chapter(段落朗读，需开通权限)
     * @param {(ISEResultLevelType | string)} [resultlevel=ISEResultLevelType.COMPLETE] 评测结果等级，可选值： plain（精简），complete（完整），默认为 complete
     * @param {number} [speexsize] 标准speex解码帧的大小（当aue=speex时，若传此参数，表明音频格式为标准speex；若不传，表明音频格式为讯飞定制speex）
     * @param {ISEExtraAbilityType} [extraability] 拓展能力（内测中，暂不支持），可选值：multi_dimension(全维度)、chapter（段落评测）
     * @returns {Promise<ICommonResponseBody>}
     * @memberof Client
     * @see 有空再补充返回结果的内容吧 http://doc.xfyun.cn/ise_protocol/%E8%AF%84%E6%B5%8B%E7%BB%93%E6%9E%9C%E6%A0%BC%E5%BC%8F.html
     */
    ISE(audio: any[] | Buffer | ArrayBuffer, text: string, aue: ISEAueType | string, language: ISELanguageType | string, category: ISECategoryType | string, resultlevel?: ISEResultLevelType | string, speexsize?: number, extraability?: ISEExtraAbilityType): Promise<ICommonResponseBody>;
    private SetRequestParams(requestParamsJson, appkey);
    private GetEncodedContent(fileContent);
}
/**
 * 语音评测音频格式
 *
 * @export
 * @enum {number}
 */
export declare enum ISEAueType {
    /**
     * 未压缩的pcm或者wav格式
     */
    RAW = "raw",
    /**
     * speex格式
     */
    SPEEX = "speex",
}
/**
 * 语音评测语言类型
 *
 * @export
 * @enum {number}
 */
export declare enum ISELanguageType {
    /**
     * 中文
     */
    CN = "cn",
    /**
     * 英文
     */
    EN = "en",
}
/**
 * 评测结果类型
 *
 * @export
 * @enum {number}
 */
export declare enum ISEResultLevelType {
    /**
     * 精简
     */
    PLAIN = "plain",
    /**
     * 完整
     */
    COMPLETE = "complete",
}
/**
 * 评测类型
 *
 * @export
 * @enum {number}
 */
export declare enum ISECategoryType {
    /**
     * 单字，汉语特有
     */
    SYLLABLE = "read_syllable",
    /**
     * 单词
     */
    WORD = "read_word",
    /**
     * 句子
     */
    SENTENCE = "read_sentence",
    /**
     * 段落
     */
    CHAPTER = "read_chapter",
}
/**
 * 扩展能力
 *
 * @export
 * @enum {number}
 */
export declare enum ISEExtraAbilityType {
    /**
     * 全维度
     */
    MULTI_DIMENSION = "multi_dimension",
    /**
     * 段落
     */
    CHAPTER = "chapter",
}
/**
 * 文本类型,目前仅可传入 "text"
 *
 * @export
 * @enum {number}
 */
export declare enum TTSTextType {
    /**
     * 普通格式文本
     */
    TEXT = "text",
}
/**
 * 引擎类型
 *
 * @export
 * @enum {string}
 */
export declare enum TTSEngineType {
    /**
     * 普通效果
     */
    AISound = "aisound",
    /**
     * 中文
     */
    INTP65CN = "intp65",
    /**
     * 英文
     */
    INTP65EN = "intp65_en",
    /**
     * 小语种
     */
    MTTS = "mtts",
    /**
     * 优化效果
     */
    X = "x",
}
/**
 * TTS服务的音频采样率
 *
 * @export
 * @enum {string}
 */
export declare enum TTSAufType {
    L16_8K = "audio/L16;rate=8000",
    L16_16K = "audio/L16;rate=16000",
}
/**
 * TTS的音频编码类型
 *
 * @export
 * @enum {string}
 */
export declare enum TTSAueType {
    /**
     * 未压缩的pcm或者wav格式
     */
    RAW = "raw",
    /**
     * mp3格式
     */
    LAME = "lame",
}
/**
 * TTS发音人
 *
 * @export
 * @enum {string}
 */
export declare enum TTSVoiceName {
    /**
     * 晓燕
     */
    XiaoYan = "xiaoyan",
}
/**
 * IAT引擎类型
 * @export
 * @enum {string}
 */
export declare enum IATEngineType {
    /**
     * 8K采样率普通话
     */
    SMS8K_Mandarin = "sms8k",
    /**
     * 16k采样率普通话
     */
    SMS16K_Mandarin = "sms16k",
    /**
     * 8k采样率英语
     */
    SMS8K_English = "sms-en8k",
    /**
     * 16k采样率英语
     */
    SMS16K_English = "sms-en16k",
}
/**
 * IAT的音频编码
 * @export
 * @enum {string}
 */
export declare enum IATAueType {
    /**
     * 未压缩的pcm或wav格式
     */
    RAW = "raw",
    /**
     * speex格式
     */
    SPEEX = "speex",
    /**
     * 宽频speex格式
     */
    SPEEX_WB = "speex-wb",
}
/**
 * 代理服务器的身份验证
 *
 * @export
 * @interface IProxyAuth
 */
export interface IProxyAuth {
    /**
     * 用户名
     *
     * @type {string}
     */
    username: string;
    /**
     * 密码
     *
     * @type {string}
     */
    password: string;
}
/**
 * 代理服务器
 *
 * @export
 * @interface IProxyConfig
 */
export interface IProxyConfig {
    /**
     * 代理服务器地址
     *
     * @type {string}
     * @memberof IProxyConfig
     */
    host: string;
    /**
     * 代理服务器端口
     *
     * @type {number}
     * @memberof IProxyConfig
     */
    port: number;
    /**
     * 代理服务器的身份验证
     *
     * @type {IProxyAuth}
     * @memberof IProxyConfig
     */
    auth?: IProxyAuth;
}
