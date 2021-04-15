const quizzesJson = require('../../data/quizzes.json');

/**
 * Returns a list of quizzes with titles and IDs
 */
async function getQuizzes(req, res, next) {
  const quizzes = getQuizzesByIdAndTitle();

  return res.send(quizzes);
};

const getQuizzesByIdAndTitle = (quizzes = quizzesJson) => Object
  .values(quizzes)
  .map(({ id, title }) => ({ id, title }));

/** 
 * Returns quiz data for the given ID, omitting the answers
 */
async function getQuiz(req, res, next) {
  const id = req.params.id;

  const quizResponse = hasValidQuizId(id)
    ? getAnswerlessQuiz(id)
    : 403;
  
  return res.send(quizResponse);
};

const hasValidQuizId = (id, quizzes = quizzesJson) => quizzes.hasOwnProperty(id);

const getAnswerlessQuiz = (id) => {
  const quiz = getQuizById(id);
  
  quiz.questions = omittAnswersFromQuestions(quiz);

  return quiz;
}

const getQuizById = (id, quizzes = quizzesJson) => ({ ...quizzes[id] });

const omittAnswersFromQuestions = ({ questions }) => questions
  .map(({ id, text, options }) => ({ id, text, options }))

/**
 * Handles a quiz submission and returns a graded result
 */
async function postQuiz(req, res, next) {
  const { questions = [] } = getQuizById(req.params.id);
  const { answers = {} } = req.body;

  const report = getReport(questions, answers);
  return res.send(report);
};

const getReport = (questions, answers) => {
  const gradedQuestions = getGradedQuestions(questions, answers);
  const { correct, incorrect } = calculateScore(gradedQuestions);

  return {
    correct,
    incorrect,
    questions: gradedQuestions
  };
};

const getGradedQuestions = (questions, answers) => questions
  .map(({ id, answer }) => ({ [id]: answer === answers[id] }))
  .reduce((map, object) => ({ ...map, ...object }), {});

const calculateScore = (questions) => {
  const gradedAnswers = Object.values(questions);
  const numberOfQuestions = gradedAnswers.length;

  const correct = gradedAnswers.filter(Boolean).length;
  const incorrect = numberOfQuestions - correct;
  
  return {
    correct,
    incorrect,
  }
}

module.exports = {
  getQuizzes,
  getQuiz,
  postQuiz
};
