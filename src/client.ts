import axios, { AxiosRequestConfig } from "axios";
import crypto from "crypto";
import http from "http";
import querystring from "querystring";
import { isNumber } from "util";

import { ICommonResponseBody, ITTSResponseBody } from "./responsemessage";
export class Client {

    /**
     * 语音听写服务请求地址
     * @type {string}
     * @memberof Client
     */
    public IATServiceEndPoint: string = "http://api.xfyun.cn/v1/service/v1/iat";
    /**
     * 语音合成服务请求地址
     * @type {string}
     * @memberof Client
     */
    public TTSServiceEndPoint: string = "http://api.xfyun.cn/v1/service/v1/tts";

    /**
     * 语音评测服务请求地址
     * @type {string}
     * @memberof Client
     */
    public ISEServiceEndPoint: string = "http://api.xfyun.cn/v1/service/v1/ise";
    /**
     * 应用ID
     *
     * @type {string}
     * @memberof Client
     */
    public AppID: string;

    /**
     * 代理服务器
     *
     * @type {IProxyConfig}
     * @memberof Client
     */
    public Proxy?: IProxyConfig;

    /**
     * 语音听写服务 AppKey
     *
     * @type {string}
     * @memberof Client
     */
    public IATAppKey?: string;
    /**
     * 语音合成 AppKey
     *
     * @type {string}
     * @memberof Client
     */
    public TTSAppKey?: string;
    /**
     * 语音评测 AppKey
     *
     * @type {string}
     * @memberof Client
     */
    public ISEAppKey?: string;

    /**
     * 建立一个讯飞 WebAPI 客户端实例
     * @param {string} appid 应用程序 AppID
     * @param {string} [iatappkey] 语音听写服务的 AppKey
     * @param {string} [ttsappkey] 语音合成服务的 AppKey
     * @param {string} [iseappkey] 语音评测服务的 AppKey
     * @memberof Client
     */
    constructor(appid: string, iatappkey?: string, ttsappkey?: string, iseappkey?: string) {
        this.AppID = appid;
        this.IATAppKey = iatappkey;
        this.TTSAppKey = ttsappkey;
        this.ISEAppKey = iseappkey;
    }

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
    public async TTS(
        text: string,
        auf: TTSAufType | string,
        aue: TTSAueType | string,
        voicename: TTSVoiceName | string = TTSVoiceName.XiaoYan,
        speed: number = 50,
        volume: number = 50,
        pitch: number = 50,
        enginetype: TTSEngineType | string = TTSEngineType.INTP65CN,
        texttype: TTSTextType | string = TTSTextType.TEXT)
        : Promise<ITTSResponseBody> {
        return new Promise<ITTSResponseBody>((resolve, reject) => {
            try {
                if (this.TTSAppKey === undefined) {
                    reject("尚未设定语音合成服务的 AppKey");
                }

                speed = Math.max(Math.min(Math.floor(speed), 100), 0);
                volume = Math.max(Math.min(Math.floor(volume), 100), 0);
                pitch = Math.max(Math.min(Math.floor(pitch), 100), 0);

                const requestParams = {
                    auf,
                    aue,
                    voice_name: voicename,
                    speed: speed ? speed.toFixed(0) : undefined,
                    volume: volume ? volume.toFixed(0) : undefined,
                    pitch: pitch ? pitch.toFixed(0) : undefined,
                    engine_type: enginetype,
                    text_type: texttype,
                };
                const requestParamsJson = JSON.stringify(requestParams);
                const requestConfig: AxiosRequestConfig = this.SetRequestParams(requestParamsJson, this.TTSAppKey as string);
                requestConfig.responseType = "arraybuffer";
                const requestData = querystring.stringify({ text });

                axios.post(this.TTSServiceEndPoint, requestData, requestConfig)
                    .then((response) => {
                        const result: ITTSResponseBody = {};
                        if (response.headers["content-type"] === "audio/mpeg") {
                            result.sid = response.headers.sid;
                            result.audio = new Buffer(response.data, "binary");
                        } else if (response.headers["content-type"] === "text/plain") {
                            const x = new Buffer(response.data, "utf8");
                            const resultString = x.toString("utf8");
                            const resultObject = JSON.parse(resultString);
                            result.code = resultObject.code;
                            result.desc = resultObject.desc;
                            result.sid = resultObject.sid;
                        } else {
                            reject("请求中发生未知错误");
                        }
                        resolve(result);
                    })
                    .catch((reason) => {
                        reject(reason);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

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
    public async IAT(
        audio: any[] | Buffer | ArrayBuffer,
        enginetype: IATEngineType | string,
        aue: IATAueType | string,
        speexsize?: string | number,
        scene?: string,
        vadeos: number = 1800)
        : Promise<ICommonResponseBody> {
        return new Promise<ICommonResponseBody>((resolve, reject) => {
            try {
                if (this.IATAppKey === undefined) {
                    reject("尚未设定语音听写服务的 AppKey");
                }

                const requestParams = {
                    engine_type: enginetype,
                    aue,
                    speexsize: speexsize ? speexsize.toString() : undefined,
                    scene: scene ? encodeURIComponent(scene) : undefined,
                    vadeos: vadeos ? vadeos.toString() : undefined,
                };

                const requestParamsJson = JSON.stringify(requestParams);

                const requestConfig: AxiosRequestConfig = this.SetRequestParams(requestParamsJson, this.IATAppKey as string);

                const requestData = querystring.stringify({ audio: this.GetEncodedContent(audio) });

                axios.post(this.IATServiceEndPoint, requestData, requestConfig)
                    .then((response) => {
                        resolve({
                            code: response.data.code,
                            data: response.data.data,
                            desc: response.data.desc,
                            sid: response.data.sid,
                        });
                    })
                    .catch((reason) => {
                        reject(reason);
                    });

            } catch (error) {
                reject(error);
            }
        });
    }

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
    public async ISE(
        audio: any[] | Buffer | ArrayBuffer,
        text: string,
        aue: ISEAueType | string,
        language: ISELanguageType | string,
        category: ISECategoryType | string,
        resultlevel: ISEResultLevelType | string = ISEResultLevelType.COMPLETE,
        speexsize?: number,
        extraability?: ISEExtraAbilityType,
    ): Promise<ICommonResponseBody> {

        return new Promise<ICommonResponseBody>(async (resolve, reject) => {
            try {
                if (this.ISEAppKey === undefined) {
                    reject("尚未设定语音评测服务的 AppKey");
                }

                const requestParams = {
                    aue,
                    speex_size: speexsize ? Math.floor(speexsize).toString() : undefined,
                    result_level: resultlevel,
                    language,
                    category,
                    extra_ability: extraability,
                };
                const requestParamsJson = JSON.stringify(requestParams);
                const requestConfig: AxiosRequestConfig = this.SetRequestParams(requestParamsJson, this.ISEAppKey as string);
                const requestData = querystring.stringify({ audio: this.GetEncodedContent(audio), text });
                const result = await axios.post<ICommonResponseBody>(this.ISEServiceEndPoint, requestData, requestConfig);
                resolve(result.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    private SetRequestParams(requestParamsJson: string, appkey: string) {
        const xAppid = this.AppID;
        const xParam = Buffer.from(requestParamsJson).toString("base64");
        const xCurTime = Math.floor((new Date()).valueOf() / 1000);
        const md5 = crypto.createHash("md5");
        const xCheckSum = md5.update(appkey + xCurTime + xParam).digest("hex");
        const requestConfig: AxiosRequestConfig = {
            headers: {
                "X-Appid": xAppid,
                "X-CurTime": xCurTime,
                "X-Param": xParam,
                "X-CheckSum": xCheckSum,
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            },
        };
        if (this.Proxy) {
            requestConfig.proxy = this.Proxy;
        }
        return requestConfig;
    }

    private GetEncodedContent(fileContent: any[] | Buffer | ArrayBuffer | string) {
        // 理论上这里使用 encodeURIComponent 更加合理，不知道为毛线讯飞服务端使用的 encodeURI，所以只能这样了
        const base64ed = encodeURI(Buffer.from(fileContent).toString("base64"));
        return base64ed;
    }
}

/**
 * 语音评测音频格式
 *
 * @export
 * @enum {number}
 */
export enum ISEAueType {
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
export enum ISELanguageType {
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
export enum ISEResultLevelType {
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
export enum ISECategoryType {
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
export enum ISEExtraAbilityType {
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
export enum TTSTextType {
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
export enum TTSEngineType {
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
export enum TTSAufType {
    L16_8K = "audio/L16;rate=8000",
    L16_16K = "audio/L16;rate=16000",
}
/**
 * TTS的音频编码类型
 *
 * @export
 * @enum {string}
 */
export enum TTSAueType {
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
export enum TTSVoiceName {
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
export enum IATEngineType {
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
export enum IATAueType {
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
