import { AnswerCreateModel } from "../models/AnswerCreateModel";

export function getOCreateAnswerInArray(arr: AnswerCreateModel[], answerId: string): AnswerCreateModel {
    let result: AnswerCreateModel | null = null;
    
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item.answerId === answerId) {
            result = item;
            break;
        }
    }

    if (result === null) {
        result = { answerId, textEn: "", textHu: "" };
        arr.push(result);
    }

    return result;
}