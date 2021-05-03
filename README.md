# getir-casestudy

## Server :

- host: https://getir-interview.herokuapp.com

## Database :

- Database - `getircase-study`
- Uri - `mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true`
- Collection - `records`

## COMMANDS :

- Start - `npm start`
- Test - `npm test`

## API

- GET `https://getir-interview.herokuapp.com/records?skip=0&limit=10000`
- POST `https://getir-interview.herokuapp.com/filter-records`

  Payload Below:

  ```
  {
  "startDate": "2016-01-26",
  "endDate": "2018-02-02",
  "minCount": 2700,
  "maxCount": 3000
  }
  ```

- GET `https://getir-interview.herokuapp.com/coverage` - to view the code coverage
- GET `https://getir-interview.herokuapp.com/test` - to view the tests

## Input Validation - Joi

- we have used Joi library to validate the given input as middleware

## Data Exchange Format -

- consumes = application/json
- produces = application/json

## SUGGESTIONS -

- We can use redis to cache data for sometime if payload is same for request, it will help in performance optimisation
- We can use swagger for the API Documentation

## MONGODB WORKING AGGREGATION QUERY

```

records.aggregate([
  {
    '$match': {
      '$and': [ {
        createdAt: {
          '$lte': 2018-02-02T00:00:00.000Z,
          '$gte': 2016-01-26T00:00:00.000Z
          }
        }
      ]
    }
  },
  {
    '$unwind': '$counts'
  },
  {
    '$group': {
      _id: '$_id',
      key: { '$first': '$key' },
      createdAt: { '$first': '$createdAt' },
      totalCount: { '$sum': '$counts' }
    }
  },
  {
    '$match': {
      '$and': [ {
        totalCount: {
          '$gte': 2700,
          '$lte': 3000
        }
      }
    ] }
  }], {})

```

### API TEST COVERAGE

- We have used JEST and supertest to test our api and write few test cases.

### RUN LOCALLY

- `git clone git@github.com:amulyakashyap09/getir-casestudy.git`
- `npm start`
- use domain as `localhost:3000` to run api
