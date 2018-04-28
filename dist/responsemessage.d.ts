/// <reference types="node" />
/**
 * 讯飞错误代码
 *
 * @export
 * @interface IResponseMessage
 */
export interface IResponseCode {
    /**
     * 错误代码
     *
     * @type {string}
     * @memberof IResponseCode
     */
    Code: string;
    /**
     * 描述（中文）
     *
     * @type {string}
     * @memberof IResponseCode
     */
    DescriptionCN: string;
    /**
     * 描述（英文）
     *
     * @type {string}
     * @memberof IResponseCode
     */
    DescriptionEN: string;
    /**
     * 可能的解决方案
     *
     * @type {(string | undefined)}
     * @memberof IResponseCode
     */
    Resolve: string | undefined;
}
/**
 * 讯飞的WebAPI通用返回接口
 *
 * @export
 * @interface ICommonResponseBody
 */
export interface ICommonResponseBody {
    /**
     * 返回结果码
     *
     * @type {string}
     * @memberof ICommonResponseBody
     */
    code?: string;
    /**
     * 返回数据，根据不同的接口其具体结构不同
     *
     * @type {string | IISECompleteResult | IISEPlainResult}
     * @memberof ICommonResponseBody
     */
    data?: string | IISECompleteResult | IISEPlainResult;
    /**
     * 描述
     *
     * @type {string}
     * @memberof ICommonResponseBody
     */
    desc?: string;
    /**
     * 回话ID
     *
     * @type {string}
     * @memberof ICommonResponseBody
     */
    sid?: string;
}
/**
 * TTS引擎请求成功时的返回
 *
 * @export
 * @interface ITTSResponseBody
 */
export interface ITTSResponseBody extends ICommonResponseBody {
    /**
     * 音频数据
     *
     * @type {*}
     * @memberof ITTSResponseBody
     */
    audio?: Buffer;
}
export declare const ResponseCodes: IResponseCode[];
/**
 * 句子评测的精简结果
 * @export
 * @interface IISEPlainResult
 */
export interface IISEPlainResult {
    /**
     * 0 则正常
     * @type {IValue}
     * @memberof IISEPlainResult
     */
    ret?: IValue;
    /**
     * 总分
     * @type {IValue}
     * @memberof IISEPlainResult
     */
    total_score?: IValue;
}
/**
 * 评测详细结果。 data里的总数据
 *
 * @export
 * @interface IISECompleteResult
 */
export interface IISECompleteResult {
    /**
     * 句子
     *
     * @type {IISEResultMain}
     * @memberof IISECompleteResult
     */
    read_sentence?: IISEResultMain;
    /**
     * 章节
     *
     * @type {IISEResultMain}
     * @memberof IISECompleteResult
     */
    read_chapter?: IISEResultMain;
    /**
     * 单词
     *
     * @type {IISEResultMain}
     * @memberof IISECompleteResult
     */
    read_word?: IISEResultMain;
    /**
     * 单字
     *
     * @type {IISEResultMain}
     * @memberof IISECompleteResult
     */
    read_syllable?: IISEResultMain;
}
/**
 * 哎。。。。都对讯飞这该死的返回结构无语了。。。。太特么扯淡了
 *
 * @export
 * @interface IISEResultMain
 */
export interface IISEResultMain {
    /**
     * 语言
     *
     * @type {string}
     * @memberof IReadSentenceResult
     */
    lan?: string;
    /**
     * 类型
     *
     * @type {string}
     * @memberof IReadSentenceResult
     */
    type?: string;
    /**
     * 引擎版本
     *
     * @type {string}
     * @memberof IReadSentenceResult
     */
    version?: string;
    /**
     * 评测结果
     *
     * @type {IRecPaper}
     * @memberof IReadSentenceResult
     */
    rec_paper?: IRecPaper;
    /**
     * 我也不知道这干毛线用的，反正讯飞文档里面没有写，但是某些时候会出现。
     *
     * @type {IRecPaper}
     * @memberof IReadSentenceResult
     */
    rec_tree?: IRecPaper;
}
/**
 * 评测结果
 *
 * @export
 * @interface IRecPaper
 */
export interface IRecPaper {
    /**
     * 单字朗读评测，汉语专有
     *
     * @type {IISEResultSummary}
     * @memberof IRecPaper
     */
    read_syllable?: IISEResultSummary;
    /**
     * 句子朗读评测
     *
     * @type {IISEResultSummary}
     * @memberof IRecPaper
     */
    read_sentence?: IISEResultSummary;
    /**
     * 章节朗读评测。
     * 但是，注意！！！！！！！！！！
     * 不知道为毛线讯飞在评测英语的句子的时候是用这个结构返回的数据！！！！！！
     * @type {IISEResultSummary}
     * @memberof IRecPaper
     */
    read_chapter?: IISEResultSummary;
    /**
     * 单词朗读评测
     *
     * @type {IISEResultSummary}
     * @memberof IRecPaper
     */
    read_word?: IISEResultSummary;
}
/**
 * 通用数据
 *
 * @export
 * @interface IISECommonSection
 */
export interface IISECommonSection {
    /**
     * 开始时间（帧，每帧10ms）
     *
     * @type {string}
     * @memberof IISECommonSection
     */
    beg_pos?: string;
    /**
     * 截止时间（帧，每帧10ms）
     *
     * @type {string}
     * @memberof IISECommonSection
     */
    end_pos?: string;
    /**
     * 内容
     *
     * @type {string}
     * @memberof IISECommonSection
     */
    content?: string;
    /**
     * 时间长度（帧，每帧10ms）
     *
     * @type {string}
     * @memberof IISECommonSection
     */
    time_len?: string;
}
/**
 * 评测结果总览
 *
 * @export
 * @interface IISEResultSummary
 * @extends {IISECommonSection}
 */
export interface IISEResultSummary extends IISECommonSection {
    /**
     * 总分
     *
     * @type {string}
     * @memberof IISEResultSummary
     */
    total_score?: string;
    /**
     * 声韵分（需开通多维度评分权限）
     *
     * @type {string}
     * @memberof IISEResultSummary
     */
    phone_score?: string;
    /**
     * 流畅度（需开通多维度评分权限）
     *
     * @type {string}
     * @memberof IISEResultSummary
     */
    fluency_score?: string;
    /**
     * 调型分（需开通多维度评分权限）
     *
     * @type {string}
     * @memberof IISEResultSummary
     */
    tone_score?: string;
    /**
     * 完整度分（需开通多维度评分权限）
     *
     * @type {string}
     * @memberof IISEResultSummary
     */
    integrity_score?: string;
    /**
     * 异常信息
     *
     * @type {EXCEPT_INFO}
     * @memberof IISEResultSummary
     */
    except_info?: EXCEPT_INFO;
    /**
     * 是否被拒
     *
     * @type {string}
     * @memberof IISEResultSummary
     */
    is_rejected?: string;
    sentence?: ISentence | ISentence[];
    /**
     * 全部单词数量
     *
     * @type {string}
     * @memberof IISEResultSummary
     */
    word_count?: string;
    /**
     * 准确度评分（需开通多维度评测权限）
     *
     * @type {string}
     * @memberof IISEResultSummary
     */
    accuracy_score?: string;
    /**
     * 标准度评分，评测发音是否地道（预留分暂不生效）
     *
     * @type {string}
     * @memberof IISEResultSummary
     */
    standard_score?: string;
}
/**
 * 句子
 *
 * @export
 * @interface ISentence
 * @extends {IISECommonSection}
 */
export interface ISentence extends IISECommonSection {
    /**
     * 总分
     *
     * @type {string}
     * @memberof ISentence
     */
    total_score?: string;
    /**
     * 声韵分（需开通多维度评分权限）
     *
     * @type {string}
     * @memberof ISentence
     */
    phone_score?: string;
    /**
     * 流畅度分（需开通多维度评分权限）
     *
     * @type {string}
     * @memberof ISentence
     */
    fluency_score?: string;
    /**
     * 调型分（需开通多维度权限）
     *
     * @type {string}
     * @memberof ISentence
     */
    tone_score?: string;
    /**
     * 单词
     *
     * @type {(IWord[] | IWord)}
     * @memberof ISentence
     */
    word?: IWord[] | IWord;
    /**
     * 句子索引
     *
     * @type {string}
     * @memberof ISentence
     */
    index?: string;
    /**
     * 准确度评分（需开通多维度评分权限）
     *
     * @type {string}
     * @memberof ISentence
     */
    accuracy_score?: string;
    /**
     * 标准度评分，评测发音是否地道（预留字段暂不生效）
     *
     * @type {string}
     * @memberof ISentence
     */
    standard_score?: string;
    /**
     * 句子中单词数量
     *
     * @type {string}
     * @memberof ISentence
     */
    word_count?: string;
}
/**
 * 单词
 *
 * @export
 * @interface IWord
 * @extends {IISECommonSection}
 */
export interface IWord extends IISECommonSection {
    /**
     * 拼音：数字代表声调，5和5以上表示轻声
     *
     * @type {string}
     * @memberof IWord
     */
    symbol?: string;
    /**
     * 单词在全篇章中的索引
     *
     * @type {string}
     * @memberof IWord
     */
    global_index?: string;
    /**
     * 单词在句子里的索引
     *
     * @type {string}
     * @memberof IWord
     */
    index?: string;
    /**
     * 单词属性（半句，重读，关键字等）
     *
     * @type {string}
     * @memberof IWord
     */
    property?: string;
    syll?: ISyll[] | ISyll;
    /**
     * 单词总分
     *
     * @type {string}
     * @memberof IWord
     */
    total_score?: string;
}
/**
 * 音节，单词发音的组成部分。对于汉语，一个音节对应一个字的发音。
 *
 * @export
 * @interface ISyll
 * @extends {IISECommonSection}
 */
export interface ISyll extends IISECommonSection {
    /**
     * 拼音：数字代表声调，5和5以上表示轻声
     *
     * @type {string}
     * @memberof ISyll
     */
    symbol?: string;
    /**
     * paper（试卷内容）,sil（非试卷内容）
     *
     * @type {string}
     * @memberof ISyll
     */
    rec_node_type?: string;
    /**
     * 增漏读信息
     *
     * @type {DP_MESSAGE}
     * @memberof ISyll
     */
    dp_message?: DP_MESSAGE;
    /**
     * 音素
     *
     * @type {(IPhone[] | IPhone)}
     * @memberof ISyll
     */
    phone?: IPhone[] | IPhone;
    /**
     * 音节重读标记
     *
     * @type {string}
     * @memberof ISyll
     */
    syll_accent?: string;
    /**
     * 音节得分
     *
     * @type {string}
     * @memberof ISyll
     */
    syll_score: string;
}
/**
 * 音素，基本发音单元，音节的组成部分
 *
 * @export
 * @interface IPhone
 * @extends {IISECommonSection}
 */
export interface IPhone extends IISECommonSection {
    /**
     * 增漏读信息
     *
     * @type {DP_MESSAGE}
     * @memberof IPhone
     */
    dp_message?: DP_MESSAGE;
    /**
     * paper（试卷内容）,sil（非试卷内容）
     *
     * @type {string}
     * @memberof IPhone
     */
    rec_node_type?: string;
    /**
     * 是否是韵母
     *
     * @type {string}
     * @memberof IPhone
     */
    is_yun?: string;
    /**
     * 文本调型信息：TONE1（一声） TONE2（二声）  TONE3（三声）  TONE4（四声）
     *
     * @type {string}
     * @memberof IPhone
     */
    mono_tone?: string;
}
export interface IValue {
    value: string;
}
/**
 * 增漏读说明
 *
 * @export
 * @enum {number}
 */
export declare enum DP_MESSAGE {
    /**
     * 引擎认为该单元读了，但是不一定朗读正确
     */
    Normal = "0",
    /**
     * 漏读，该单元没有读
     */
    Miss = "16",
    /**
     * 增读，该单元是多度的文本内的内容
     */
    Extra = "32",
    /**
     * 回读，该单元是重复读的相邻文本的内容
     */
    Repeat = "64",
    /**
     * 替换，该单元读成了文本内其他的内容
     */
    Replace = "128",
}
/**
 * 异常信息
 *
 * @export
 * @enum {number}
 */
export declare enum EXCEPT_INFO {
    /**
     * 无异常
     */
    Normal = "0",
    /**
     * 无语音输入或者音量太小
     */
    VolumeOutOfRange = "28673",
    /**
     * 检测到语音为乱说类型
     */
    Nonsense = "28676",
    /**
     * 音频的信噪比太低
     */
    LowSignalNoseRatio = "28680",
    /**
     * 音频数据出现截幅
     */
    AmpTruncated = "28690",
}
