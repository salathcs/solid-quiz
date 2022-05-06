import { GameStatus } from '../models/GameStatus';
import { Thing, addUrl, getBoolean, addInteger } from '@inrupt/solid-client';
import SOLIDQUIZ from './SOLIDQUIZ';
import { getUrl } from '@inrupt/solid-client';
import { NUMBER_OF_CORRECT_ANSWERS, SUCCESS_OF_QUESTION_RESULT } from '../constants/SolidQuizMissingValues';

export function generateRandomSeries(count: number): number[] {
    const rv: number[] = [];
    const seriesValues = generateSeries(count);

    for (let i = count - 1; i >= 0; i--) {
        const selected = Math.floor(Math.random() * i);
        
        const fromSeries = seriesValues.splice(selected, 1)[0];

        rv.push(fromSeries);
    }

    return rv;
}

export function addNewQuestionResult(gameStatus: GameStatus, newQuestionResultThing: Thing) {
    //if first question result
    if (gameStatus.questionResultThings.length === 0) {
        gameStatus.quizResultThing = addUrl(
            gameStatus.quizResultThing, 
            SOLIDQUIZ.firstQuestionResult.value, 
            getFutureUrl(gameStatus.quizResultNameUri, newQuestionResultThing));
        gameStatus.questionResultThings.push(newQuestionResultThing);

        return;
    }

    //get last question result, will be modified -> add nextQuestionResult url to it
    const lastQuestionResultThing = getLastQuestionResult(gameStatus.questionResultThings);

    const indexOfLast = gameStatus.questionResultThings.indexOf(lastQuestionResultThing);

    gameStatus.questionResultThings[indexOfLast] = addUrl(
        lastQuestionResultThing, 
        SOLIDQUIZ.nextQuestionResult.value, 
        getFutureUrl(gameStatus.quizResultNameUri, newQuestionResultThing));

    //set (need to overwrite) previousQuestionResult to the lastQuestionResultThing
    newQuestionResultThing = addUrl(
        newQuestionResultThing, 
        SOLIDQUIZ.previousQuestionResult.value, 
        getFutureUrl(gameStatus.quizResultNameUri, lastQuestionResultThing));

    //push to arr
    gameStatus.questionResultThings.push(newQuestionResultThing);
}

export function addNumberOfSuccessToQuizResult(gameStatus: GameStatus) {
    let successCounter = 0;

    gameStatus.questionResultThings.forEach((questionResultThing) => {
        const success = getBoolean(questionResultThing, SUCCESS_OF_QUESTION_RESULT) ?? false;

        if (success) {
            successCounter++;
        }
    });

    gameStatus.quizResultThing = addInteger(gameStatus.quizResultThing, NUMBER_OF_CORRECT_ANSWERS, successCounter);
}


//privates
function getLastQuestionResult(questionResultThings: Thing[]): Thing {
    for (let i = 0; i < questionResultThings.length; i++) {
        const questionResultThing = questionResultThings[i];
        
        const nextUri = getUrl(questionResultThing, SOLIDQUIZ.nextQuestionResult.value);

        //if missing nextQuestionResult, will be set and next time will pass this statement
        if (nextUri === null) {
            return questionResultThing;
        }
    }

    throw new Error("something went wrong (getLastQuestionResult)");
}

function getFutureUrl(quizResultNameUri: string, thing: Thing): string {
    const indexOfSeparator = thing.url.lastIndexOf('/');

    const str = thing.url.substring(indexOfSeparator + 1);

    return `${quizResultNameUri}#${str}`;
}

function generateSeries(count: number): number[] {
    const rv: number[] = [];

    for (let i = 0; i < count; i++) {
        rv.push(i);    
    }

    return rv;
}
