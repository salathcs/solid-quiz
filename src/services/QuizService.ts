import { addInteger, addUrl, buildThing, createSolidDataset, createThing, getSolidDataset, getSourceUrl, getThing, saveSolidDatasetAt, setThing, ThingBuilder, ThingLocal } from '@inrupt/solid-client';
import { RDF } from '@inrupt/vocab-common-rdf';
import { QUIZZES_CONTAINER } from '../constants/DefaultValues';
import { CREATED, MULTI_LANGUAGE_SUPPORT, NUMBER_OF_QUESTIONS, TITLE } from '../constants/SolidQuizMissingValues';
import { SolidDataset_Type, SolidFetch_Type } from '../constants/SolidDatasetType';
import SOLIDQUIZ from '../helpers/SOLIDQUIZ';
import { QuizFormModel } from '../models/QuizFormModel';
import { QuizContainer } from './../models/QuizContainer';
import { QuestionContainer } from './../models/QuestionContainer';
import { NestedLocalDataset } from '../models/NestedLocalDataset';
import { DatasetAndThing } from '../models/DatasetAndThing';

export function createQuizContainer(quizName: string, quizFormModel: QuizFormModel, webId: string): QuizContainer {
    const quizThingBuilder = buildThing(createThing({ name: quizName }))
      .addUrl(RDF.type, SOLIDQUIZ.Quiz.value)
      .addDatetime(CREATED, new Date())
      .addUrl(SOLIDQUIZ.createdBy.value, webId)
      .addBoolean(MULTI_LANGUAGE_SUPPORT, quizFormModel.multiLang);

    addTitlesToQuizBasedOnLang(quizThingBuilder, quizFormModel);

    const quizThing = quizThingBuilder.build();

    return { quizName, quizFormModel, quiz: quizThing, questions: [] };
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

export function getSpecificQuizUri(workspaceUri: string, quizTitle: string) {
    return `${getQuizzesContainer(workspaceUri)}${quizTitle}/${quizTitle}.ttl`;
}

export async function createQuizzesContainer(workspaceUri: string, fetch: SolidFetch_Type) {
    const quizzesWorkspace = getQuizzesContainer(workspaceUri);

    if (await isQuizzesExists(quizzesWorkspace)) {
        return;
    }

    await saveSolidDatasetAt(quizzesWorkspace, createSolidDataset(), { fetch });
}

export async function checkQuizTitleIsAlreadyReserved(quizTitle: string, workspaceUri: string, fetch: SolidFetch_Type): Promise<boolean> {
  const quizUrl = getSpecificQuizUri(workspaceUri, quizTitle);
  try {
    await getSolidDataset(quizUrl, { fetch });
    return true;
  } catch (error: any) {
    if (error.statusCode === 404) {
      return false;
    }

    console.log(error);
  }

  throw new Error('unkown error in checkQuizTitleIsAlreadyReserved');
}

export async function saveNewQuiz(quizContainer: QuizContainer, workspaceUri: string, fetch: SolidFetch_Type): Promise<DatasetAndThing> {
  const quizUrl = getSpecificQuizUri(workspaceUri, quizContainer.quizName);

  addQuestionsToQuiz(quizContainer, quizUrl);


  let localeDataset = createSolidDataset();
  localeDataset = setThing(localeDataset, quizContainer.quiz);
  const nestedDateset = { localeDataset };
  addQuestionsToDataset(nestedDateset, quizContainer);
  
  const updatedDataset = await saveSolidDatasetAt(quizUrl, nestedDateset.localeDataset, {
    fetch: fetch,
  });
  
  const savedThingUri = getSavedQuizThingsUri(quizContainer.quizName, updatedDataset);
  const savedThing = getThing(updatedDataset, savedThingUri);

  if (savedThing === null) {
      throw new Error("creating share failed, cannot load it");
  }

  return { dataset: updatedDataset, thing: savedThing };
}


//privates
function addTitlesToQuizBasedOnLang(quizThingBuilder: ThingBuilder<ThingLocal>, quizFormModel: QuizFormModel) {
    if (quizFormModel.multiLang) {
        quizThingBuilder.addStringWithLocale(TITLE, quizFormModel.quizTitleEn, "en")
                        .addStringWithLocale(TITLE, quizFormModel.quizTitleHu, "hu");
    }
    else if (quizFormModel.lang === 'hu') {
        quizThingBuilder.addStringNoLocale(TITLE, quizFormModel.quizTitleHu);
    }
    else{
        quizThingBuilder.addStringNoLocale(TITLE, quizFormModel.quizTitleEn);
    }
}

function addQuestionsToQuiz(quizContainer: QuizContainer, quizUrl: string){
  for (let i = 0; i < quizContainer.questions.length; i++) {
    const questionContainer = quizContainer.questions[i];
    
    const questionUrl = `${quizUrl}#${questionContainer.questionName}`;

    quizContainer.quiz = addUrl(quizContainer.quiz, SOLIDQUIZ.quizQuestion.value, questionUrl);
  }

  quizContainer.quiz = addInteger(quizContainer.quiz, NUMBER_OF_QUESTIONS, quizContainer.questions.length);
}

function addQuestionsToDataset(nestedDataset: NestedLocalDataset, quizContainer: QuizContainer) {
  for (let i = 0; i < quizContainer.questions.length; i++) {
    const questionContainer = quizContainer.questions[i];
    
    nestedDataset.localeDataset = setThing(nestedDataset.localeDataset, questionContainer.question);
    addAnswersToDataset(nestedDataset, questionContainer);
  }
}

function addAnswersToDataset(nestedDataset: NestedLocalDataset, questionContainer: QuestionContainer) {
  for (let i = 0; i < questionContainer.answers.length; i++) {
    const answer = questionContainer.answers[i].answer;
    
    nestedDataset.localeDataset = setThing(nestedDataset.localeDataset, answer);
  }
}

function getSavedQuizThingsUri(quizName: string, updatedDataset: SolidDataset_Type): string {
    const datasetUri = getSourceUrl(updatedDataset);

    return `${datasetUri}#${quizName}`;
}

async function isQuizzesExists(uri: string): Promise<boolean> {
    try {
      await getSolidDataset(uri);
      return true;
    } catch (error: any) {
        return false;
    }
}
