import { buildThing, createThing, getStringNoLocale, getStringWithLocale, Thing, ThingBuilder, ThingLocal } from '@inrupt/solid-client';
import { RDF } from '@inrupt/vocab-common-rdf';
import { ANSWER_TEXT, QUESTION_TEXT } from '../constants/SolidQuizMissingValues';
import SOLIDQUIZ from '../helpers/SOLIDQUIZ';
import { MultiLangText } from '../models/MultiLangText';
import { QuestionContainer } from '../models/QuestionContainer';
import { QuestionCreateModel } from '../models/QuestionCreateModel';
import { QuizContainer } from '../models/QuizContainer';
import { AnswerContainer } from './../models/AnswerContainer';
import { AnswerCreateModel } from './../models/AnswerCreateModel';

export function createQuestionContainer(questionModel: QuestionCreateModel, quizUri: string): QuestionContainer {
    const questionName = createQuestionName(questionModel);
    const answerContainers = createAnswerThings(questionModel);

    const questionThingBuilder = buildThing(createThing({ name: questionName }))
        .addUrl(RDF.type, SOLIDQUIZ.Question.value);

    addTextToQuestionBasedOnLang(questionThingBuilder, questionModel);

    addAnswersToQuestion(questionThingBuilder, questionModel.answerOptions, quizUri, questionModel.correctAnswerId);

    const questionThing = questionThingBuilder.build();

    return { questionName, questionModel, question: questionThing, answers: answerContainers }; 
}

export function getQuestionText(quizContainer: QuizContainer, questionNumber: number) : MultiLangText {    
    const questionContainer = getQuestionContainer(questionNumber, quizContainer);

    return getMultiLangTextFromThing(
        quizContainer.quizFormModel.multiLang, 
        quizContainer.quizFormModel.lang,
        questionContainer.question,
        QUESTION_TEXT); 
}

export function getAnswerText(quizContainer: QuizContainer, questionNumber: number, answerId: string) : MultiLangText {
    const questionContainer = getQuestionContainer(questionNumber, quizContainer);

    const answerName = createAnswerNameFromAnswerId(answerId);

    const answerContainer = questionContainer.answers.find((container) => container.answerName === answerName);

    if (answerContainer === undefined) {
        throw new Error(`cannot find answer based on ${answerName}`);
    }
    
    return getMultiLangTextFromThing(
        quizContainer.quizFormModel.multiLang, 
        quizContainer.quizFormModel.lang,
        answerContainer.answer,
        ANSWER_TEXT);
}

export function getQuestionContainer(questionNumber: number, quizContainer: QuizContainer): QuestionContainer {
    const questionName = createQuestionNameFromNumber(questionNumber);

    const questionContainer = quizContainer.questions.find((container) => container.questionName === questionName);

    if (questionContainer === undefined) {
        throw new Error(`cannot find question based on ${questionName}`);
    }

    return questionContainer;
}

export function isAnswerExists(answerId: string, questionNumber: number, quizContainer: QuizContainer): boolean {
    try {
        const questionContainer = getQuestionContainer(questionNumber, quizContainer);

        const answerName = createAnswerNameFromAnswerId(answerId);

        const answerContainer = questionContainer.answers.find((container) => container.answerName === answerName);
        
        return answerContainer !== undefined;
    } catch {
        return false;
    }
}

export function getQuestionNumber(questionName: string): number {
    const indexOfSeparator = questionName.indexOf('_');

    const str = questionName.substring(indexOfSeparator + 1);

    return +(str);
}

export function getAnswerNumber(answerName: string): number {
    const indexOfSeparator = answerName.indexOf('_');

    const str =  answerName.substring(indexOfSeparator + 1);

    return +(str);
}


//privates
function createQuestionName(questionModel: QuestionCreateModel): string {
    return `question_${questionModel.questionNumber}`;
}

function createQuestionNameFromNumber(questionNumber: number): string {
    return `question_${questionNumber.toString()}`;
}

function createAnswerName(answerOption: AnswerCreateModel): string {
    return `answer_${answerOption.answerId}`;
}

function createAnswerNameFromAnswerId(answerNumber: string): string {
    return `answer_${answerNumber}`;
}

function createAnswerThings(questionModel: QuestionCreateModel): AnswerContainer[] {
    const arr: AnswerContainer[] = [];

    for (let i = 0; i < questionModel.answerOptions.length; i++) {
        const answerOption = questionModel.answerOptions[i];
        
        const answerName = createAnswerName(answerOption);

        const answerThingBuilder = buildThing(createThing({ name: answerName }))
            .addUrl(RDF.type, SOLIDQUIZ.Answer.value);

        addTextToAnswerBasedOnLang(answerThingBuilder, questionModel, answerOption);
        
        const answerThing = answerThingBuilder.build();
        
        arr.push({ answerName: answerName, answer: answerThing });
    }

    return arr;
}

function addTextToAnswerBasedOnLang(answerThingBuilder: ThingBuilder<ThingLocal>, questionModel: QuestionCreateModel, answerOption: AnswerCreateModel) {
    if (questionModel.multiLang) {
        answerThingBuilder.addStringWithLocale(ANSWER_TEXT, answerOption.textEn, "en")
                          .addStringWithLocale(ANSWER_TEXT, answerOption.textHu, "hu");
    }
    else if (questionModel.lang === 'hu') {
        answerThingBuilder.addStringNoLocale(ANSWER_TEXT, answerOption.textHu);
    }
    else{
        answerThingBuilder.addStringNoLocale(ANSWER_TEXT, answerOption.textEn);
    }
}

function addTextToQuestionBasedOnLang(questionThingBuilder: ThingBuilder<ThingLocal>, questionModel: QuestionCreateModel) {
    if (questionModel.multiLang) {
        questionThingBuilder.addStringWithLocale(QUESTION_TEXT, questionModel.textEn, "en")
                          .addStringWithLocale(QUESTION_TEXT, questionModel.textHu, "hu");
    }
    else if (questionModel.lang === 'hu') {
        questionThingBuilder.addStringNoLocale(QUESTION_TEXT, questionModel.textHu);
    }
    else{
        questionThingBuilder.addStringNoLocale(QUESTION_TEXT, questionModel.textEn);
    }
}

function addAnswersToQuestion(questionThingBuilder: ThingBuilder<ThingLocal>, answerOptions: AnswerCreateModel[], quizUri: string, correctAnswerId: string) {
    const correctAnswerUri = getCorrectAnswerUri(answerOptions, quizUri, correctAnswerId);
    questionThingBuilder.addUrl(SOLIDQUIZ.correctAnswerOption.value, correctAnswerUri);

    for (let i = 0; i < answerOptions.length; i++) {
        const answer = answerOptions[i];
        
        //this will be the answers uri, inside quizzes dataset (#answer_answerId), this is a thing
        //this is just an estimation, because currently theese are local datas, after save will be permanent
        const answerFutureUri = `${quizUri}#${createAnswerName(answer)}`;

        questionThingBuilder.addUrl(SOLIDQUIZ.answerOption.value, answerFutureUri);
    }
}

function getCorrectAnswerUri(answerOptions: AnswerCreateModel[], quizUri: string, correctAnswerId: string): string {
    const correctAnswer = answerOptions.find((item) => item.answerId === correctAnswerId);

    if (correctAnswer === undefined) {
        throw new Error('Correct answer with answerId: 0; is missing!');
    }

    return `${quizUri}#${createAnswerName(correctAnswer)}`;
}

function getMultiLangTextFromThing(multiLang: boolean, lang: string, thing: Thing, propertyUrl: string): MultiLangText {
    if (multiLang) {
        const textEn = getStringWithLocale(thing, propertyUrl, "en") ?? "";
        const textHu = getStringWithLocale(thing, propertyUrl, "hu") ?? "";
        return { textEn , textHu };
    }
    else{
        const text = getStringNoLocale(thing, propertyUrl) ?? "";

        if (lang === 'hu') {
            return { textEn: "" , textHu: text };
        }
        else{
            return { textEn: text , textHu: "" };
        }
    }
}
