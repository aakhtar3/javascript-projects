const {
  getQuizzes,
  getQuiz,
  postQuiz,
} = require('../routes');

const mockReq = (params = { id: '' }, body = {}) => ({
  params,
  body
});

const mockRes = (send = (arg) => arg) => ({ send });

const mockNext = (next = () => {}) => next;

describe('API', () => {
  describe('getQuizzes', () => {
    describe('When invoking getQuizzes', () => {
      it('Then it should returns a list of quizzes', async () => {
        const quizzes = await getQuizzes(mockReq(), mockRes(), mockNext());
  
        expect(Object.keys(quizzes).length).toEqual(2);
      });
    });
  });

  describe('getQuiz', () => {
    describe('When passing vaild param', () => {
      it('Then it should return the data for a quiz', async() => {
        const param = { id: 'math' };
        const quiz = await getQuiz(mockReq(param), mockRes(), mockNext());
        
        expect(quiz.id).toEqual('math');
        expect(quiz.questions.length).toEqual(3);
        quiz.questions.forEach(({ answer }) => expect(answer).toEqual(undefined));
      });
    });

    describe('When passing invalid param', () => {
      it('Then it should return 403', async() => {
        const error = await getQuiz(mockReq(), mockRes(), mockNext())

        expect(error).toEqual(403);
      });
    });
  });

  describe('postQuiz', () => {
    describe('When passing vaild param and body', () => {
      describe('When all questions are correct', () => {
        it('Then it should return all correct', async() => {
          const param = { id: 'math' };
          const body = {
            'answers': {
              'question_1': '2',
              'question_2': 'True',
              'question_3': '7'
            }
          };

          const report = await postQuiz(mockReq(param, body), mockRes(), mockNext());
          expect(report.correct).toEqual(3);
          expect(report.incorrect).toEqual(0);
          expect(Object.keys(report.questions).length).toEqual(3);
        });
      });

      describe('When all questions are incorrect', () => {
        it('Then it should return all incorrect', async() => {
          const param = { id: 'math' };

          const report = await postQuiz(mockReq(param), mockRes(), mockNext());
          expect(report.correct).toEqual(0);
          expect(report.incorrect).toEqual(3);
          expect(Object.keys(report.questions).length).toEqual(3);
        });
      });
    });

    describe('When passing invaild param and body', () => {
      describe('When all questions are missing', () => {
        it('Then it should return empty response', async() => {
          const report = await postQuiz(mockReq(), mockRes(), mockNext());

          expect(report.correct).toEqual(0);
          expect(report.incorrect).toEqual(0);
          expect(Object.keys(report.questions).length).toEqual(0);
        });
      });
    })
  });
});
