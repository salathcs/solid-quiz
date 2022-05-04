import { buildThing, createThing, getSolidDataset, ThingBuilder, ThingLocal } from '@inrupt/solid-client';
import { RDF } from '@inrupt/vocab-common-rdf';
import { QUIZZES_CONTAINER } from '../constants/DefaultValues';
import { CREATED, MULTI_LANGUAGE_SUPPORT, TITLE } from '../constants/SolidQuizMissingValues';
import { SolidFetch_Type } from '../helpers/SolidDatasetType';
import SOLIDQUIZ from '../helpers/SOLIDQUIZ';
import { QuizFormModel } from '../models/QuizFormModel';
import { QuizContainer } from './../models/QuizContainer';

export function createQuizContainer(quizName: string, quizFormModel: QuizFormModel, webId: string): QuizContainer {
    const quizThingBuilder = buildThing(createThing({ name: quizName }))
      .addUrl(RDF.type, SOLIDQUIZ.Quiz.value)
      .addDatetime(CREATED, new Date())
      .addUrl(SOLIDQUIZ.createdBy.value, webId)
      .addBoolean(MULTI_LANGUAGE_SUPPORT, quizFormModel.multiLang);

    addTitlesToQuizBasedOnLang(quizThingBuilder, quizFormModel);

    const quizThing = quizThingBuilder.build();

    return { quizFormModel, quiz: quizThing, questions: [] };
}

//quiz resource name, contained inside the pod, when saving will get file extension: .ttl
export function createQuizResourceName(quizFormModel: QuizFormModel): string {
    const trimedEn = quizFormModel.quizTitleEn.replace(/\s/g, "");
    const trimedHu = quizFormModel.quizTitleHu.replace(/\s/g, "");
    return `${trimedEn}_${trimedHu}`;
}

export function getQuizzesContainer(workspaceUri: string) {
    return `${workspaceUri}${QUIZZES_CONTAINER}`;
}

export async function checkQuizTitleIsAlreadyReserved(quizTitle: string, workspaceUri: string, fetch: SolidFetch_Type): Promise<boolean> {
  const indexUrl = `${getQuizzesContainer(workspaceUri)}${quizTitle}`;
  try {
    await getSolidDataset(indexUrl, { fetch });
    return true;
  } catch (error: any) {
    if (error.statusCode === 404) {
      return false;
    }

    console.log(error);
  }

  throw new Error('unkown error in checkQuizTitleIsAlreadyReserved');
}


//privates
function addTitlesToQuizBasedOnLang(quizThingBuilder: ThingBuilder<ThingLocal>, quizFormModel: QuizFormModel) {
    if (quizFormModel.multiLang) {
        quizThingBuilder.addStringWithLocale(TITLE, quizFormModel.quizTitleEn, "en")
                        .addStringWithLocale(TITLE, quizFormModel.quizTitleHu, "hu");
        return;
    }

    if (quizFormModel.lang === 'hu') {
        quizThingBuilder.addStringNoLocale(TITLE, quizFormModel.quizTitleHu);
    }
    else{
        quizThingBuilder.addStringNoLocale(TITLE, quizFormModel.quizTitleEn);
    }
}