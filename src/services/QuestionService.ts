import { buildThing, createThing, getStringNoLocale, getStringWithLocale, ThingBuilder, ThingLocal } from '@inrupt/solid-client';
import { RDF } from '@inrupt/vocab-common-rdf';
import { ANSWER_TEXT, QUESTION_TEXT } from '../constants/SolidQuizMissingValues';
import SOLIDQUIZ from '../helpers/SOLIDQUIZ';
import { MultiLangText } from '../models/MultiLangText';
import { QuestionContainer } from '../models/QuestionContainer';
import { QuestionCreateModel } from '../models/QuestionCreateModel';
import { QuizContainer } from '../models/QuizContainer';
import { AnswerContainer } from './../models/AnswerContainer';
import { AnswerCreateModel } from './../models/AnswerCreateModel';

export function createQuestionThing(questionModel: QuestionCreateModel, quizUri: string): QuestionContainer {
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
    const questionName = createQuestionNameFromNumber(questionNumber);

    const questionThing = quizContainer.questions.find((container) => container.questionName === questionName)?.question;

    if (questionThing === undefined) {
        throw new Error(`cannot find question based on ${questionName}`);
    }

    if (quizContainer.quizFormModel.multiLang) {
        const textEn = getStringWithLocale(questionThing, QUESTION_TEXT, "en") ?? "";
        const textHu = getStringWithLocale(questionThing, QUESTION_TEXT, "hu") ?? "";
        return { textEn , textHu };
    }
    else{
        const text = getStringNoLocale(questionThing, QUESTION_TEXT) ?? "";

        if (quizContainer.quizFormModel.lang === 'hu') {
            return { textEn: "" , textHu: text };
        }
        else{
            return { textEn: text , textHu: "" };
        }
    }
}


//privates
function createAnswerThings(questionModel: QuestionCreateModel): AnswerContainer[] {
    const arr: AnswerContainer[] = [];

    for (let i = 0; i < questionModel.answerOptions.length; i++) {
        const answerOption = questionModel.answerOptions[i];
        
        const answerThingBuilder = buildThing(createThing({ name: createAnswerName(answerOption) }))
            .addUrl(RDF.type, SOLIDQUIZ.Answer.value);

        addTextToAnswerBasedOnLang(answerThingBuilder, questionModel, answerOption);
        
        const answerThing = answerThingBuilder.build();
        
        arr.push({ answer: answerThing });
    }

    return arr;
}

function createQuestionName(questionModel: QuestionCreateModel): string {
    return `question_${questionModel.questionNumber}`;
}

function createQuestionNameFromNumber(questionNumber: number): string {
    return `question_${questionNumber.toString()}`;
}

function createAnswerName(answerOption: AnswerCreateModel): string {
    return `answer_${answerOption.answerId}`;
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
