"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var crypto_1 = __importDefault(require("crypto"));
var querystring_1 = __importDefault(require("querystring"));
var Client = /** @class */ (function () {
    /**
     * 建立一个讯飞 WebAPI 客户端实例
     * @param {string} appid 应用程序 AppID
     * @param {string} [iatappkey] 语音听写服务的 AppKey
     * @param {string} [ttsappkey] 语音合成服务的 AppKey
     * @param {string} [iseappkey] 语音评测服务的 AppKey
     * @memberof Client
     */
    function Client(appid, iatappkey, ttsappkey, iseappkey) {
        /**
         * 语音听写服务请求地址
         * @type {string}
         * @memberof Client
         */
        this.IATServiceEndPoint = "http://api.xfyun.cn/v1/service/v1/iat";
        /**
         * 语音合成服务请求地址
         * @type {string}
         * @memberof Client
         */
        this.TTSServiceEndPoint = "http://api.xfyun.cn/v1/service/v1/tts";
        /**
         * 语音评测服务请求地址
         * @type {string}
         * @memberof Client
         */
        this.ISEServiceEndPoint = "http://api.xfyun.cn/v1/service/v1/ise";
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
    Client.prototype.TTS = function (text, auf, aue, voicename, speed, volume, pitch, enginetype, texttype) {
        if (voicename === void 0) { voicename = TTSVoiceName.XiaoYan; }
        if (speed === void 0) { speed = 50; }
        if (volume === void 0) { volume = 50; }
        if (pitch === void 0) { pitch = 50; }
        if (enginetype === void 0) { enginetype = TTSEngineType.INTP65CN; }
        if (texttype === void 0) { texttype = TTSTextType.TEXT; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            if (_this.TTSAppKey === undefined) {
                                reject("尚未设定语音合成服务的 AppKey");
                            }
                            speed = Math.max(Math.min(Math.floor(speed), 100), 0);
                            volume = Math.max(Math.min(Math.floor(volume), 100), 0);
                            pitch = Math.max(Math.min(Math.floor(pitch), 100), 0);
                            var requestParams = {
                                auf: auf,
                                aue: aue,
                                voice_name: voicename,
                                speed: speed ? speed.toFixed(0) : undefined,
                                volume: volume ? volume.toFixed(0) : undefined,
                                pitch: pitch ? pitch.toFixed(0) : undefined,
                                engine_type: enginetype,
                                text_type: texttype,
                            };
                            var requestParamsJson = JSON.stringify(requestParams);
                            var requestConfig = _this.SetRequestParams(requestParamsJson, _this.TTSAppKey);
                            requestConfig.responseType = "arraybuffer";
                            var requestData = querystring_1.default.stringify({ text: text });
                            axios_1.default.post(_this.TTSServiceEndPoint, requestData, requestConfig)
                                .then(function (response) {
                                var result = {};
                                if (response.headers["content-type"] === "audio/mpeg") {
                                    result.sid = response.headers.sid;
                                    result.audio = new Buffer(response.data, "binary");
                                }
                                else if (response.headers["content-type"] === "text/plain") {
                                    var x = new Buffer(response.data, "utf8");
                                    var resultString = x.toString("utf8");
                                    var resultObject = JSON.parse(resultString);
                                    result.code = resultObject.code;
                                    result.desc = resultObject.desc;
                                    result.sid = resultObject.sid;
                                }
                                else {
                                    reject("请求中发生未知错误");
                                }
                                resolve(result);
                            })
                                .catch(function (reason) {
                                reject(reason);
                            });
                        }
                        catch (error) {
                            reject(error);
                        }
                    })];
            });
        });
    };
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
    Client.prototype.IAT = function (audio, enginetype, aue, speexsize, scene, vadeos) {
        if (vadeos === void 0) { vadeos = 1800; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            if (_this.IATAppKey === undefined) {
                                reject("尚未设定语音听写服务的 AppKey");
                            }
                            var requestParams = {
                                engine_type: enginetype,
                                aue: aue,
                                speexsize: speexsize ? speexsize.toString() : undefined,
                                scene: scene ? encodeURIComponent(scene) : undefined,
                                vadeos: vadeos ? vadeos.toString() : undefined,
                            };
                            var requestParamsJson = JSON.stringify(requestParams);
                            var requestConfig = _this.SetRequestParams(requestParamsJson, _this.IATAppKey);
                            var requestData = querystring_1.default.stringify({ audio: _this.GetEncodedContent(audio) });
                            axios_1.default.post(_this.IATServiceEndPoint, requestData, requestConfig)
                                .then(function (response) {
                                resolve({
                                    code: response.data.code,
                                    data: response.data.data,
                                    desc: response.data.desc,
                                    sid: response.data.sid,
                                });
                            })
                                .catch(function (reason) {
                                reject(reason);
                            });
                        }
                        catch (error) {
                            reject(error);
                        }
                    })];
            });
        });
    };
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
    Client.prototype.ISE = function (audio, text, aue, language, category, resultlevel, speexsize, extraability) {
        if (resultlevel === void 0) { resultlevel = ISEResultLevelType.COMPLETE; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var requestParams, requestParamsJson, requestConfig, requestData, result, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    if (this.ISEAppKey === undefined) {
                                        reject("尚未设定语音评测服务的 AppKey");
                                    }
                                    requestParams = {
                                        aue: aue,
                                        speex_size: speexsize ? Math.floor(speexsize).toString() : undefined,
                                        result_level: resultlevel,
                                        language: language,
                                        category: category,
                                        extra_ability: extraability,
                                    };
                                    requestParamsJson = JSON.stringify(requestParams);
                                    requestConfig = this.SetRequestParams(requestParamsJson, this.ISEAppKey);
                                    requestData = querystring_1.default.stringify({ audio: this.GetEncodedContent(audio), text: text });
                                    return [4 /*yield*/, axios_1.default.post(this.ISEServiceEndPoint, requestData, requestConfig)];
                                case 1:
                                    result = _a.sent();
                                    resolve(result.data);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _a.sent();
                                    reject(error_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.SetRequestParams = function (requestParamsJson, appkey) {
        var xAppid = this.AppID;
        var xParam = Buffer.from(requestParamsJson).toString("base64");
        var xCurTime = Math.floor((new Date()).valueOf() / 1000);
        var md5 = crypto_1.default.createHash("md5");
        var xCheckSum = md5.update(appkey + xCurTime + xParam).digest("hex");
        var requestConfig = {
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
    };
    Client.prototype.GetEncodedContent = function (fileContent) {
        // 理论上这里使用 encodeURIComponent 更加合理，不知道为毛线讯飞服务端使用的 encodeURI，所以只能这样了
        var base64ed = encodeURI(Buffer.from(fileContent).toString("base64"));
        return base64ed;
    };
    return Client;
}());
exports.Client = Client;
/**
 * 语音评测音频格式
 *
 * @export
 * @enum {number}
 */
var ISEAueType;
(function (ISEAueType) {
    /**
     * 未压缩的pcm或者wav格式
     */
    ISEAueType["RAW"] = "raw";
    /**
     * speex格式
     */
    ISEAueType["SPEEX"] = "speex";
})(ISEAueType = exports.ISEAueType || (exports.ISEAueType = {}));
/**
 * 语音评测语言类型
 *
 * @export
 * @enum {number}
 */
var ISELanguageType;
(function (ISELanguageType) {
    /**
     * 中文
     */
    ISELanguageType["CN"] = "cn";
    /**
     * 英文
     */
    ISELanguageType["EN"] = "en";
})(ISELanguageType = exports.ISELanguageType || (exports.ISELanguageType = {}));
/**
 * 评测结果类型
 *
 * @export
 * @enum {number}
 */
var ISEResultLevelType;
(function (ISEResultLevelType) {
    /**
     * 精简
     */
    ISEResultLevelType["PLAIN"] = "plain";
    /**
     * 完整
     */
    ISEResultLevelType["COMPLETE"] = "complete";
})(ISEResultLevelType = exports.ISEResultLevelType || (exports.ISEResultLevelType = {}));
/**
 * 评测类型
 *
 * @export
 * @enum {number}
 */
var ISECategoryType;
(function (ISECategoryType) {
    /**
     * 单字，汉语特有
     */
    ISECategoryType["SYLLABLE"] = "read_syllable";
    /**
     * 单词
     */
    ISECategoryType["WORD"] = "read_word";
    /**
     * 句子
     */
    ISECategoryType["SENTENCE"] = "read_sentence";
    /**
     * 段落
     */
    ISECategoryType["CHAPTER"] = "read_chapter";
})(ISECategoryType = exports.ISECategoryType || (exports.ISECategoryType = {}));
/**
 * 扩展能力
 *
 * @export
 * @enum {number}
 */
var ISEExtraAbilityType;
(function (ISEExtraAbilityType) {
    /**
     * 全维度
     */
    ISEExtraAbilityType["MULTI_DIMENSION"] = "multi_dimension";
    /**
     * 段落
     */
    ISEExtraAbilityType["CHAPTER"] = "chapter";
})(ISEExtraAbilityType = exports.ISEExtraAbilityType || (exports.ISEExtraAbilityType = {}));
/**
 * 文本类型,目前仅可传入 "text"
 *
 * @export
 * @enum {number}
 */
var TTSTextType;
(function (TTSTextType) {
    /**
     * 普通格式文本
     */
    TTSTextType["TEXT"] = "text";
})(TTSTextType = exports.TTSTextType || (exports.TTSTextType = {}));
/**
 * 引擎类型
 *
 * @export
 * @enum {string}
 */
var TTSEngineType;
(function (TTSEngineType) {
    /**
     * 普通效果
     */
    TTSEngineType["AISound"] = "aisound";
    /**
     * 中文
     */
    TTSEngineType["INTP65CN"] = "intp65";
    /**
     * 英文
     */
    TTSEngineType["INTP65EN"] = "intp65_en";
    /**
     * 小语种
     */
    TTSEngineType["MTTS"] = "mtts";
    /**
     * 优化效果
     */
    TTSEngineType["X"] = "x";
})(TTSEngineType = exports.TTSEngineType || (exports.TTSEngineType = {}));
/**
 * TTS服务的音频采样率
 *
 * @export
 * @enum {string}
 */
var TTSAufType;
(function (TTSAufType) {
    TTSAufType["L16_8K"] = "audio/L16;rate=8000";
    TTSAufType["L16_16K"] = "audio/L16;rate=16000";
})(TTSAufType = exports.TTSAufType || (exports.TTSAufType = {}));
/**
 * TTS的音频编码类型
 *
 * @export
 * @enum {string}
 */
var TTSAueType;
(function (TTSAueType) {
    /**
     * 未压缩的pcm或者wav格式
     */
    TTSAueType["RAW"] = "raw";
    /**
     * mp3格式
     */
    TTSAueType["LAME"] = "lame";
})(TTSAueType = exports.TTSAueType || (exports.TTSAueType = {}));
/**
 * TTS发音人
 *
 * @export
 * @enum {string}
 */
var TTSVoiceName;
(function (TTSVoiceName) {
    /**
     * 晓燕
     */
    TTSVoiceName["XiaoYan"] = "xiaoyan";
})(TTSVoiceName = exports.TTSVoiceName || (exports.TTSVoiceName = {}));
/**
 * IAT引擎类型
 * @export
 * @enum {string}
 */
var IATEngineType;
(function (IATEngineType) {
    /**
     * 8K采样率普通话
     */
    IATEngineType["SMS8K_Mandarin"] = "sms8k";
    /**
     * 16k采样率普通话
     */
    IATEngineType["SMS16K_Mandarin"] = "sms16k";
    /**
     * 8k采样率英语
     */
    IATEngineType["SMS8K_English"] = "sms-en8k";
    /**
     * 16k采样率英语
     */
    IATEngineType["SMS16K_English"] = "sms-en16k";
})(IATEngineType = exports.IATEngineType || (exports.IATEngineType = {}));
/**
 * IAT的音频编码
 * @export
 * @enum {string}
 */
var IATAueType;
(function (IATAueType) {
    /**
     * 未压缩的pcm或wav格式
     */
    IATAueType["RAW"] = "raw";
    /**
     * speex格式
     */
    IATAueType["SPEEX"] = "speex";
    /**
     * 宽频speex格式
     */
    IATAueType["SPEEX_WB"] = "speex-wb";
})(IATAueType = exports.IATAueType || (exports.IATAueType = {}));
