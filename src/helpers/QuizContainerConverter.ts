import { Thing, getBoolean, getUrlAll, getUrl, removeUrl } from '@inrupt/solid-client';
import { SolidDataset_Type } from '../constants/SolidDatasetType';
import { QuizContainer } from './../models/QuizContainer';
import * as questionService from '../services/QuestionService';
import * as quizService from '../services/QuizService';
import * as workspaceService from '../services/WorkspaceService';
import { QuizFormModel } from './../models/QuizFormModel';
import { ANSWER_TEXT, MULTI_LANGUAGE_SUPPORT, QUESTION_TEXT, TITLE } from '../constants/SolidQuizMissingValues';
import { getMutliLang } from './LangReader';
import { QuestionContainer } from '../models/QuestionContainer';
import SOLIDQUIZ from './SOLIDQUIZ';
import { AnswerContainer } from './../models/AnswerContainer';
import { QuestionCreateModel } from '../models/QuestionCreateModel';
import { AnswerCreateModel } from './../models/AnswerCreateModel';

export function convert(quizThing: Thing, quizDataset: SolidDataset_Type, lang: string): QuizContainer {  
    const multiLang = getBoolean(quizThing, MULTI_LANGUAGE_SUPPORT) ?? false; 

    const quizContainer = createQuizContainer(quizThing, multiLang, lang);

    quizContainer.questions = createQuestionContainers(quizThing, quizDataset, multiLang, lang);

    return quizContainer;
}

function createQuizContainer(quizThing: Thing, multiLang: boolean, lang: string): QuizContainer {
    const quizFormModel = createQuizFormModel(quizThing, multiLang, lang);
    const quizName = quizService.createQuizResourceName(quizFormModel);

    const questionUris = getUrlAll(quizThing, SOLIDQUIZ.quizQuestion.value);
    for (let i = 0; i < questionUris.length; i++) {
        const uri = questionUris[i];
        quizThing = removeUrl(quizThing, SOLIDQUIZ.quizQuestion.value, uri);
    }

    return {quizName, quizFormModel, quiz: quizThing, questions: []};
}

function createQuizFormModel(quizThing: Thing, multiLang: boolean, lang: string): QuizFormModel {
    const multiLangData = getMutliLang(quizThing, TITLE, multiLang, lang);

    return { quizTitleEn: multiLangData.textEn, quizTitleHu: multiLangData.textHu, multiLang, lang}
}

function createQuestionContainers(quizThing: Thing, quizDataset: SolidDataset_Type, multiLang: boolean, lang: string): QuestionContainer[] {
    const questionUris = getUrlAll(quizThing, SOLIDQUIZ.quizQuestion.value);
    
    const questionThings = workspaceService.getAllThingByUris(quizDataset, questionUris);

    const questionContainers: QuestionContainer[] = [];

    questionThings.forEach((questionThing) => {
        const quiestionContainer = createQuiestionContainer(questionThing, quizDataset, multiLang, lang);

        questionContainers.push(quiestionContainer);
    });

    return questionContainers;
}

function createQuiestionContainer(questionThing: Thing, quizDataset: SolidDataset_Type, multiLang: boolean, lang: string): QuestionContainer {
    const questionName = getFragmentFromUri(questionThing.url);

    const answerContainers = createAnswerContainers(questionThing, quizDataset);

    const questionModel = createQuestionCreateModel(questionThing, questionName, answerContainers, multiLang, lang);

    return { questionName, questionModel, question: questionThing, answers: answerContainers };
}

function createQuestionCreateModel(questionThing: Thing, questionName: string, answerContainers: AnswerContainer[], multiLang: boolean, lang: string): QuestionCreateModel {
    const questionNumber = questionService.getQuestionNumber(questionName);
    
    const multiLangData = getMutliLang(questionThing, QUESTION_TEXT, multiLang, lang);

    const correctAnswerUri = getUrl(questionThing, SOLIDQUIZ.correctAnswerOption) ?? "error";
    const correctAnswerName = getFragmentFromUri(correctAnswerUri);
    const correctAnswerId = questionService.getAnswerNumber(correctAnswerName).toString(); 

    const answerModels = createAnswerCreateModels(answerContainers, multiLang, lang);

    return { questionNumber, textEn: multiLangData.textEn, textHu: multiLangData.textHu, answerOptions: answerModels, correctAnswerId, multiLang, lang };
}

function createAnswerCreateModels(answerContainers: AnswerContainer[], multiLang: boolean, lang: string): AnswerCreateModel[] {
    const answerModels: AnswerCreateModel[] = [];

    answerContainers.forEach(answerContainer => {
        const answerModel = createAnswerCreateModel(answerContainer, multiLang, lang);

        answerModels.push(answerModel);
    })

    return answerModels;
}

function createAnswerCreateModel(answerContainer: AnswerContainer, multiLang: boolean, lang: string): AnswerCreateModel {
    const answerId = questionService.getAnswerNumber(answerContainer.answerName).toString();

    const multiLangData = getMutliLang(answerContainer.answer, ANSWER_TEXT, multiLang, lang);

    return { answerId, textEn: multiLangData.textEn, textHu: multiLangData.textHu };
}

function createAnswerContainers(questionThing: Thing, quizDataset: SolidDataset_Type): AnswerContainer[] {
    const answerUris = getUrlAll(questionThing, SOLIDQUIZ.answerOption.value);
    
    const answerThings = workspaceService.getAllThingByUris(quizDataset, answerUris);

    const answerContainers: AnswerContainer[] = [];

    answerThings.forEach(answerThing => {
        const answerContainer = createAnswerContainer(answerThing);

        answerContainers.push(answerContainer);
    })

    return answerContainers;
}

function createAnswerContainer(answerThing: Thing): AnswerContainer {
    const answerName = getFragmentFromUri(answerThing.url);

    return { answerName, answer: answerThing };
}

function getFragmentFromUri(uri:string): string {
    const indexOfSeparator = uri.indexOf('#');

    return uri.substring(indexOfSeparator + 1);
}
