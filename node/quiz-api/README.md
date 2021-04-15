#  Quiz App

## Development

After downloading the repo, go to the directory and run 
```
npm install
```
followed by 
```
npm start
```
You can access the local server at [localhost:3000](http://localhost:3000).

To run the tests run `npm test`.

## API Documentation

### Curl Examples

> GET -> /api/quizzes

`curl localhost:3000/api/quizzes`

> GET -> /api/quizzes/math

`curl localhost:3000/api/quizzes/math`

> POST -> /api/quizzes/math/attempt

`curl -X POST -H 'Content-Type: application/json' -d '{"answers":{"question_1":"2","question_2":"True","question_3":"7"}}' localhost:3000/api/quizzes/math/attempt`
