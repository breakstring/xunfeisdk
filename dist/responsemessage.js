"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseCodes = [
    {
        Code: "0",
        DescriptionCN: "成功",
        DescriptionEN: "success",
        Resolve: undefined,
    },
    {
        Code: "10105",
        DescriptionCN: "没有权限",
        DescriptionEN: "illegal access",
        Resolve: "检查apiKey，ip，checkSum等授权参数是否正确",
    },
    {
        Code: "10106",
        DescriptionCN: "无效参数",
        DescriptionEN: "invalid parameter",
        Resolve: "上传必要的参数， 检查参数格式以及编码",
    },
    {
        Code: "10107",
        DescriptionCN: "非法参数值",
        DescriptionEN: "illegal parameter",
        Resolve: "检查参数值是否超过范围或不符合要求",
    },
    {
        Code: "10109",
        DescriptionCN: "文本/音频长度非法",
        DescriptionEN: "illegal text/audio length",
        Resolve: "检查上传文本/音频长度是否超过限制",
    },
    {
        Code: "10110",
        DescriptionCN: "无授权许可",
        DescriptionEN: "no license",
        Resolve: "提供请求的 appid、 auth_id 向服务商反馈",
    },
    {
        Code: "10114",
        DescriptionCN: "超时",
        DescriptionEN: "time out",
        Resolve: "检测网络连接或联系服务商",
    },
    {
        Code: "10700",
        DescriptionCN: "引擎错误",
        DescriptionEN: "engine error",
        Resolve: "提供接口返回值，向服务商反馈",
    },
    {
        Code: "11200",
        DescriptionCN: "无发音人授权",
        DescriptionEN: "no vcn auth",
        Resolve: "确认是否具有使用该发音人权限，开通授权请联系讯飞工作人员",
    },
    {
        Code: "11201",
        DescriptionCN: "成功",
        DescriptionEN: "appid authorize number not enough",
        Resolve: "服务单日调用次数超过限制	确认服务单日调用次数是否超过限制",
    },
];
