/**
 * Generated by the artifact generator [@inrupt/artifact-generator], version [1.0.4]
 * as part of artifact: [generated-vocab-solidquiz], version: [0.0.1]
 * on 'Friday, May 6, 2022 10:42 PM'.
 *
 * Vocabulary built from input: [solidQuiz.ttl].
 *
 * 
    The solidQuiz ontology aims at describing quiz objects and quiz results.
    
 */

// We prefix our local variables with underscores to (hopefully!) prevent
// potential names clashes with terms from vocabularies.
const { VocabTerm: _VocabTerm, getLocalStore } = require("@inrupt/solid-common-vocab");
const _DataFactory = require("@rdfjs/data-model");

const { namedNode: _namedNode } = _DataFactory;

function _NS(localName) {
  return _namedNode(`https://salathcs.solidcommunity.net/public/voc/SolidQuiz/v0p5/solidQuiz.ttl#${localName}`);
}

/**
 * 
    The solidQuiz ontology aims at describing quiz objects and quiz results.
    
 */
const SOLIDQUIZ = {
  PREFIX: "solidQuiz",
  NAMESPACE: "https://salathcs.solidcommunity.net/public/voc/SolidQuiz/v0p5/solidQuiz.ttl#",
  PREFIX_AND_NAMESPACE: { "solidQuiz": "https://salathcs.solidcommunity.net/public/voc/SolidQuiz/v0p5/solidQuiz.ttl#" },
  NS: _NS,

  // *****************
  // All the Classes.
  // *****************

  /**
   * An quiz is a multiple-choice test made for fun purposes.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  Quiz: new _VocabTerm(
    _NS("Quiz"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Quiz`, "en")
    .addLabel(`Kvíz`, "hu")
    .addComment(`An quiz is a multiple-choice test made for fun purposes.`, "en")
    .addComment(`A kvíz egy felelet választós feladatsor szórakoztató jelleggel.`, "hu"),

  /**
   * Question for quiz, a quiz should have a few questions.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  Question: new _VocabTerm(
    _NS("Question"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`question`, "en")
    .addLabel(`kérdés`, "hu")
    .addComment(`Question for quiz, a quiz should have a few questions.`, "en")
    .addComment(`Kérdés kvízhez, egy kvíznek tartalmaznia kell kérdéseket.`, "hu"),

  /**
   * Answer for a question. This is mainly an option, might not be the correct answer.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  Answer: new _VocabTerm(
    _NS("Answer"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`answer`, "en")
    .addLabel(`válasz`, "hu")
    .addComment(`Answer for a question. This is mainly an option, might not be the correct answer.`, "en")
    .addComment(`Válasz a kérdésre. A válasz nem feltétlenül helyes, mivel ez egy válaszlehetőség.`, "hu"),

  /**
   * The result of a Quiz.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  QuizResult: new _VocabTerm(
    _NS("QuizResult"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Quiz result`, "en")
    .addLabel(`Kvíz eredmény`, "hu")
    .addComment(`The result of a Quiz.`, "en")
    .addComment(`Egy kvíz eredménye.`, "hu"),

  /**
   * Question result for quiz result. Indicates the result of a specific question.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  QuestionResult: new _VocabTerm(
    _NS("QuestionResult"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`question result`, "en")
    .addLabel(`kérdés eredménye`, "hu")
    .addComment(`Question result for quiz result. Indicates the result of a specific question.`, "en")
    .addComment(`Kérdés eredménye kvíz eredményéhez. Egy konkrét kérdés eredményét jelöli.`, "hu"),

  /**
   * Solid quiz resource sharing. Shared resources are the quizzes and quiz result.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  Shares: new _VocabTerm(
    _NS("Shares"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`shares`, "en")
    .addLabel(`megosztások`, "hu")
    .addComment(`Solid quiz resource sharing. Shared resources are the quizzes and quiz result.`, "en")
    .addComment(`Solid kvíz erőforrások megosztása. Megoszthatók a kvízek és kvíz eredmények`, "hu"),


  // *******************
  // All the Properties.
  // *******************

  /**
   * Relationship between the quiz and the person who created it.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  createdBy: new _VocabTerm(
    _NS("createdBy"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`created by`, "en")
    .addLabel(`készítette`, "hu")
    .addComment(`Relationship between the quiz and the person who created it.`, "en")
    .addComment(`A kapcsolat a kvíz és az alkotója között.`, "hu"),

  /**
   * The relationship between the question and the quiz. An quiz has a few questions.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  quizQuestion: new _VocabTerm(
    _NS("quizQuestion"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`question of the quiz`, "en")
    .addLabel(`kérdés a kvízhez`, "hu")
    .addComment(`The relationship between the question and the quiz. An quiz has a few questions.`, "en")
    .addComment(`Kapcsolat a kérdés és a kvíz között. Egy kvízhez több kérdés kapcsolódik (általában).`, "hu"),

  /**
   * Relationship between the answer and the question. An question has at least two answer options.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  answerOption: new _VocabTerm(
    _NS("answerOption"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`answer option for the question`, "en")
    .addLabel(`válaszlehetőség a kérdésre`, "hu")
    .addComment(`Relationship between the answer and the question. An question has at least two answer options.`, "en")
    .addComment(`A válasz és a kérdés közötti kapcsolat. Egy kérdés legalább két válaszlehetőséggel rendelkezik.`, "hu"),

  /**
   * Relationship between the correct answer and the question.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  correctAnswerOption: new _VocabTerm(
    _NS("correctAnswerOption"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`the correct answer option for the question`, "en")
    .addLabel(`a helyes válaszlehetőség a kérdésre`, "hu")
    .addComment(`Relationship between the correct answer and the question.`, "en")
    .addComment(`A helyes válasz és a kérdés közötti kapcsolat.`, "hu"),

  /**
   * The relationship between the quiz result and the completed quiz.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  quizResultOf: new _VocabTerm(
    _NS("quizResultOf"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`quiz result of`, "en")
    .addLabel(`kvíz eredménye a`, "hu")
    .addComment(`The relationship between the quiz result and the completed quiz.`, "en")
    .addComment(`A kvíz eredménye és a megvalósított kvíz közötti kapcsolat.`, "hu"),

  /**
   * Relationship between the quiz result and the person who created it.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  quizResultCreatedBy: new _VocabTerm(
    _NS("quizResultCreatedBy"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`quiz result created by`, "en")
    .addLabel(`kvíz eredményét készítette`, "hu")
    .addComment(`Relationship between the quiz result and the person who created it.`, "en")
    .addComment(`A kapcsolat a kvíz eredménye és az alkotója között.`, "hu"),

  /**
   * The relationship between the quiz result and the question result, this is the first questions result.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  firstQuestionResult: new _VocabTerm(
    _NS("firstQuestionResult"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`first question result`, "en")
    .addLabel(`első kérdés eredménye`, "hu")
    .addComment(`The relationship between the quiz result and the question result, this is the first questions result.`, "en")
    .addComment(`A kvíz eredménye és a kérdés eredménye közötti kapcsolat, a kvíz első kérdésének eredménye.`, "hu"),

  /**
   * The relationship between two questions result, the domain is the previous and the range is the next.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  nextQuestionResult: new _VocabTerm(
    _NS("nextQuestionResult"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`next question result`, "en")
    .addLabel(`következő kérdés eredménye`, "hu")
    .addComment(`The relationship between two questions result, the domain is the previous and the range is the next.`, "en")
    .addComment(`Kapcsolat két kérdés eredménye között, a domain az előző, a range a következő.`, "hu"),

  /**
   * The relationship between two questions result, the domain is the next and the range is the previous.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  previousQuestionResult: new _VocabTerm(
    _NS("previousQuestionResult"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`previous question result`, "en")
    .addLabel(`előző kérdés eredménye`, "hu")
    .addComment(`The relationship between two questions result, the domain is the next and the range is the previous.`, "en")
    .addComment(`Kapcsolat két kérdés eredménye között, a domain az következő, a range az előző.`, "hu"),

  /**
   * The relationship between the question result and the question.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  questionResultOf: new _VocabTerm(
    _NS("questionResultOf"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`the question for the result`, "en")
    .addLabel(`a kérdés az eredményhez`, "hu")
    .addComment(`The relationship between the question result and the question.`, "en")
    .addComment(`A kérdés eredménye és a kérdés közötti kapcsolat.`, "hu"),

  /**
   * The relationship between the question result and the answer.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  questionResultsAnswer: new _VocabTerm(
    _NS("questionResultsAnswer"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`the answer for the question in the result`, "en")
    .addLabel(`a kérdésre adott válasz az eredményben`, "hu")
    .addComment(`The relationship between the question result and the answer.`, "en")
    .addComment(`A kérdés eredménye és a konkrét válasz közötti kapcsolat.`, "hu"),

  /**
   * The relationship between the shares and quiz. You should access the shared resource, but the owner can revert it.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  sharedQuiz: new _VocabTerm(
    _NS("sharedQuiz"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`shared quiz`, "en")
    .addLabel(`megosztott kvíz`, "hu")
    .addComment(`The relationship between the shares and quiz. You should access the shared resource, but the owner can revert it.`, "en")
    .addComment(`A megosztás és a kvíz közötti kapcsolat. Az erőforrásnak elérhetőnek kell lennie számodra, the a tulajdonos megvonhatja azt.`, "hu"),

  /**
   * The relationship between the shares and quiz results. You should access the shared resource, but the owner can revert it.
   *
   * This term has [2] labels and comments, in the languages [en, hu].
   */
  sharedQuizResult: new _VocabTerm(
    _NS("sharedQuizResult"),
    _DataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`shared quiz result`, "en")
    .addLabel(`megosztott kvíz eredmény`, "hu")
    .addComment(`The relationship between the shares and quiz results. You should access the shared resource, but the owner can revert it.`, "en")
    .addComment(`A megosztás és a kvíz eredmény közötti kapcsolat. Az erőforrásnak elérhetőnek kell lennie számodra, the a tulajdonos megvonhatja azt.`, "hu"),

}

export default SOLIDQUIZ;
