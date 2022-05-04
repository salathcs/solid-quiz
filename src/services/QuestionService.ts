import { buildThing, createThing, ThingBuilder, ThingLocal } from '@inrupt/solid-client';
import { RDF } from '@inrupt/vocab-common-rdf';
import { ANSWER_TEXT, QUESTION_TEXT } from '../constants/SolidQuizMissingValues';
import SOLIDQUIZ from '../helpers/SOLIDQUIZ';
import { QuestionContainer } from '../models/QuestionContainer';
import { QuestionCreateModel } from '../models/QuestionCreateModel';
import { AnswerContainer } from './../models/AnswerContainer';
import { AnswerCreateModel } from './../models/AnswerCreateModel';

export function createQuestionThing(questionModel: QuestionCreateModel, quizUri: string): QuestionContainer {
    const questionName = createQuestionName(questionModel);
    const answerContainers = createAnswerThings(questionModel);

    const questionThingBuilder = buildThing(createThing({ name: questionName }))
        .addUrl(RDF.type, SOLIDQUIZ.Question.value);

    addTextToQuestionBasedOnLang(questionThingBuilder, questionModel);

    addAnswersToQuestion(questionThingBuilder, questionModel.answerOptions, quizUri);

    const questionThing = questionThingBuilder.build();

    return { questionName, questionModel, question: questionThing, answers: answerContainers }; 
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

function addAnswersToQuestion(questionThingBuilder: ThingBuilder<ThingLocal>, answerOptions: AnswerCreateModel[], quizUri: string) {
    const correctAnswerUri = getCorrectAnswerUri(answerOptions, quizUri);
    questionThingBuilder.addUrl(SOLIDQUIZ.answerOption.value, correctAnswerUri);

    for (let i = 0; i < answerOptions.length; i++) {
        const answer = answerOptions[i];
        
        //this will be the answers uri, inside quizzes dataset (#answer_answerId), this is a thing
        //this is just an estimation, because currently theese are local datas, after save will be permanent
        const answerFutureUri = `${quizUri}#${createAnswerName(answer)}`;

        questionThingBuilder.addUrl(SOLIDQUIZ.answerOption.value, answerFutureUri);
    }
}

function getCorrectAnswerUri(answerOptions: AnswerCreateModel[], quizUri: string): string {
    const correctAnswer = answerOptions.find((item) => item.answerId === "0");

    if (correctAnswer === undefined) {
        throw new Error('Correct answer with answerId: 0; is missing!');
    }

    return `${quizUri}#${createAnswerName(correctAnswer)}`;;
}
