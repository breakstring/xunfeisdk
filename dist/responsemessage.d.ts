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
     * @type {string}
     * @memberof ICommonResponseBody
     */
    data?: string;
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
