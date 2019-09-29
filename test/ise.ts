import chai from "chai";
import fs from "fs";
import * as mocha from "mocha";
import path from "path";
import * as Xunfei from "../dist";
import { IATAueType, IATEngineType, ISEAueType, ISECategoryType, ISELanguageType, ISEResultLevelType, TTSAueType, TTSAufType, TTSEngineType, TTSVoiceName } from "../dist";
import { IISECompleteResult, IISEPlainResult } from "../dist/responsemessage";
import * as config from "./config";

const should = chai.should();
const EN_16K_SAMPLE = "EN_16.wav";
const EN_CONTENT = "The bear is on top";
const BEAR_WORD_FILE = "en_word_single.txt";
const MULTI_WORDS_FILE = "en_word_multiple.txt";
const BEAR_WAV = "bear.wav";
const CN_SYLL_WAV = "chi.wav";
const CN_SYLL_1 = "cnsyll1.txt";
const CN_SYLL_2 = "cnsyll2.txt";
const CN_WORD_WAV = "chuntianlaile.wav";
const CN_WORD_1 = "cnword1.txt";
const CN_WORD_2 = "cnword2.txt";
const CN_SENTENCE_WAV = "dishangdehuaerduohaokanna.wav";
const CN_SENTENCE_1 = "cnsentence1.txt";
const CN_SENTENCE_2 = "cnsentence2.txt";

let client: Xunfei.Client;

before("实例化讯飞客户端", (done) => {
    client = new Xunfei.Client(config.AppID);
    done();
});

describe("语音评测", async () => {
    describe("英文语音评测", async () => {
        it("评测英文单词,获取精简结果", async () => {
            client.AppID = config.AppID;
            client.ISEAppKey = config.ISEAppKey;
            const audio = fs.readFileSync(path.join(__dirname, BEAR_WAV));
            const word = fs.readFileSync(path.join(__dirname, BEAR_WORD_FILE), "utf8");
            const result = await client.ISE(audio, word, ISEAueType.RAW, ISELanguageType.EN, ISECategoryType.WORD, ISEResultLevelType.PLAIN);
            chai.expect(result).property("code", "0");
            const wordPlainResult = result.data as IISEPlainResult;
            chai.expect(wordPlainResult).have.property("ret").have.property("value", "0");
            chai.expect(wordPlainResult).have.property("total_score").have.property("value");
        });
        it("评测英文单词,获取完整结果", async () => {
            client.AppID = config.AppID;
            client.ISEAppKey = config.ISEAppKey;
            const audio = fs.readFileSync(path.join(__dirname, BEAR_WAV));
            const word = fs.readFileSync(path.join(__dirname, BEAR_WORD_FILE), "utf8");
            const result = await client.ISE(audio, word, ISEAueType.RAW, ISELanguageType.EN, ISECategoryType.WORD, ISEResultLevelType.COMPLETE);
            chai.expect(result).property("code", "0");
            const wordCompleteResult = result.data as IISECompleteResult;
            chai.expect(wordCompleteResult).have.property("read_word").have.property("rec_paper").have.property("read_word").have.property("total_score");
        });
        it("评测多个英文单词文本和单个英文单词音频的组合,获取精简结果", async () => {
            client.AppID = config.AppID;
            client.ISEAppKey = config.ISEAppKey;
            const audio = fs.readFileSync(path.join(__dirname, BEAR_WAV));
            const word = fs.readFileSync(path.join(__dirname, MULTI_WORDS_FILE), "utf8");
            const result = await client.ISE(audio, word, ISEAueType.RAW, ISELanguageType.EN, ISECategoryType.WORD, ISEResultLevelType.PLAIN);
            chai.expect(result).property("code", "0");
            const wordPlainResult = result.data as IISEPlainResult;
            chai.expect(wordPlainResult).have.property("ret").have.property("value", "0");
            chai.expect(wordPlainResult).have.property("total_score").have.property("value");
        });
        it("评测多个英文单词文本和单个英文单词音频的组合,获取完整结果", async () => {
            client.AppID = config.AppID;
            client.ISEAppKey = config.ISEAppKey;
            const audio = fs.readFileSync(path.join(__dirname, BEAR_WAV));
            const word = fs.readFileSync(path.join(__dirname, MULTI_WORDS_FILE), "utf8");
            const result = await client.ISE(audio, word, ISEAueType.RAW, ISELanguageType.EN, ISECategoryType.WORD, ISEResultLevelType.COMPLETE);
            chai.expect(result).property("code", "0");
            const wordCompleteResult = result.data as IISECompleteResult;
            chai.expect(wordCompleteResult).have.property("read_word").have.property("rec_paper").have.property("read_word").have.property("total_score");
        });
        it("评测英文句子,获取精简结果", async () => {
            client.AppID = config.AppID;
            client.ISEAppKey = config.ISEAppKey;
            const audio = fs.readFileSync(path.join(__dirname, EN_16K_SAMPLE));
            const result = await client.ISE(audio, EN_CONTENT, ISEAueType.RAW, ISELanguageType.EN, ISECategoryType.SENTENCE, ISEResultLevelType.PLAIN);
            chai.expect(result).property("code", "0");
            const sentencePlainResult = result.data as IISEPlainResult;
            chai.expect(sentencePlainResult).have.property("ret").have.property("value", "0");
            chai.expect(sentencePlainResult).have.property("total_score").have.property("value");
        });
        it("评测英文句子,获取完整结果", async () => {
            client.AppID = config.AppID;
            client.ISEAppKey = config.ISEAppKey;
            const audio = fs.readFileSync(path.join(__dirname, EN_16K_SAMPLE));
            const result = await client.ISE(audio, EN_CONTENT, ISEAueType.RAW, ISELanguageType.EN, ISECategoryType.SENTENCE, ISEResultLevelType.COMPLETE);
            chai.expect(result).property("code", "0");
            const sentenceCompleteResult = result.data as IISECompleteResult;
            chai.expect(sentenceCompleteResult).have.property("read_sentence").have.property("rec_paper").have.property("read_chapter").have.property("total_score");
        });
    });

    describe("中文语音评测", async () => {

        it("评测中文单字文本格式1,获取完整结果", async () => {
            client.AppID = config.AppID;
            client.ISEAppKey = config.ISEAppKey;
            const audio = fs.readFileSync(path.join(__dirname, CN_SYLL_WAV));
            const syll = fs.readFileSync(path.join(__dirname, CN_SYLL_1), "utf8");
            const result = await client.ISE(audio, syll, ISEAueType.RAW, ISELanguageType.CN, ISECategoryType.SYLLABLE, ISEResultLevelType.COMPLETE);
            chai.expect(result).property("code", "0");
            const wordCompleteResult = result.data as IISECompleteResult;
            chai.expect(wordCompleteResult).have.property("read_syllable").have.property("rec_paper").have.property("read_syllable").have.property("total_score");
        });

        it("评测中文单字文本格式2,获取完整结果", async () => {
            client.AppID = config.AppID;
            client.ISEAppKey = config.ISEAppKey;
            const audio = fs.readFileSync(path.join(__dirname, CN_SYLL_WAV));
            const syll = fs.readFileSync(path.join(__dirname, CN_SYLL_2), "utf8");
            const result = await client.ISE(audio, syll, ISEAueType.RAW, ISELanguageType.CN, ISECategoryType.SYLLABLE, ISEResultLevelType.COMPLETE);
            chai.expect(result).property("code", "0");
            const wordCompleteResult = result.data as IISECompleteResult;
            chai.expect(wordCompleteResult).have.property("read_syllable").have.property("rec_paper").have.property("read_syllable").have.property("total_score");
        });

        it("评测中文词组文本格式1,获取完整结果", async () => {
            client.AppID = config.AppID;
            client.ISEAppKey = config.ISEAppKey;
            const audio = fs.readFileSync(path.join(__dirname, CN_WORD_WAV));
            const word = fs.readFileSync(path.join(__dirname, CN_WORD_1), "utf8");
            const result = await client.ISE(audio, word, ISEAueType.RAW, ISELanguageType.CN, ISECategoryType.WORD, ISEResultLevelType.COMPLETE);
            chai.expect(result).property("code", "0");
            const wordCompleteResult = result.data as IISECompleteResult;
            chai.expect(wordCompleteResult).have.property("read_word").have.property("rec_paper").have.property("read_word").have.property("total_score");
        });

        it("评测中文词组文本格式2,获取完整结果", async () => {
            client.AppID = config.AppID;
            client.ISEAppKey = config.ISEAppKey;
            const audio = fs.readFileSync(path.join(__dirname, CN_WORD_WAV));
            const word = fs.readFileSync(path.join(__dirname, CN_WORD_2), "utf8");
            const result = await client.ISE(audio, word, ISEAueType.RAW, ISELanguageType.CN, ISECategoryType.WORD, ISEResultLevelType.COMPLETE);
            chai.expect(result).property("code", "0");
            const wordCompleteResult = result.data as IISECompleteResult;
            chai.expect(wordCompleteResult).have.property("read_word").have.property("rec_paper").have.property("read_word").have.property("total_score");
        });

        it("评测中文句子文本格式1,获取完整结果", async () => {
            client.AppID = config.AppID;
            client.ISEAppKey = config.ISEAppKey;
            const audio = fs.readFileSync(path.join(__dirname, CN_SENTENCE_WAV));
            const word = fs.readFileSync(path.join(__dirname, CN_SENTENCE_1), "utf8");
            const result = await client.ISE(audio, word, ISEAueType.RAW, ISELanguageType.CN, ISECategoryType.SENTENCE, ISEResultLevelType.COMPLETE);
            chai.expect(result).property("code", "0");
            const wordCompleteResult = result.data as IISECompleteResult;
            chai.expect(wordCompleteResult).have.property("read_sentence").have.property("rec_paper").have.property("read_sentence").have.property("total_score");
        });

        it("评测中文句子文本格式2,获取完整结果", async () => {
            client.AppID = config.AppID;
            client.ISEAppKey = config.ISEAppKey;
            const audio = fs.readFileSync(path.join(__dirname, CN_SENTENCE_WAV));
            const word = fs.readFileSync(path.join(__dirname, CN_SENTENCE_2), "utf8");
            const result = await client.ISE(audio, word, ISEAueType.RAW, ISELanguageType.CN, ISECategoryType.SENTENCE, ISEResultLevelType.COMPLETE);
            chai.expect(result).property("code", "0");
            const wordCompleteResult = result.data as IISECompleteResult;
            chai.expect(wordCompleteResult).have.property("read_sentence").have.property("rec_paper").have.property("read_sentence").have.property("total_score");
        });
    });
});

