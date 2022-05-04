import { QuestionCreateModel } from './../models/QuestionCreateModel';

export function validateModel(model: QuestionCreateModel): string | null {
    let error = validateText(model);

    if (error !== null) {
        return error;
    }

    error = validateAnswers(model);

    return error;
}

function validateText(model: QuestionCreateModel): string | null {
    if (model.multiLang) {
        if (model.textEn.length <= 0 || model.textHu.length <= 0) {
            return "createQuiz.question.bothLanguageRequired";
        }
    }
    else if (model.lang === 'hu') {
        if (model.textHu.length <= 0) {
            return "createQuiz.question.textRequired";
        }
    }
    else {
        if (model.textEn.length <= 0) {
            return "createQuiz.question.textRequired";
        }
    }

    return null;
}

function validateAnswers(model: QuestionCreateModel): string | null {
    if (model.answerOptions.length < 2) {
        return "createQuiz.question.answerCountRequired";
    }

    const correctAnswer = model.answerOptions.find((item) => item.answerId === model.correctAnswerId);

    if (correctAnswer === undefined) {
        return "createQuiz.question.correctAnswerRequired";
    }

    if (correctAnswer.textEn.length <= 0 && correctAnswer.textHu.length <= 0) {
        return "createQuiz.question.correctAnswerRequired";
    }

    return null;
}
