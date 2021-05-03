# getir-casestudy

## Server :

    - host: localhost
    - port: 3000

## Database :

    - Database - getircase-study
    - Uri - mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true
    - Collection - records

## COMMANDS :

    - Start - npm start
    - Test - npm test

## API

    ${host:port}/records?skip=0&limit=10000 - This api gives you records from the records collection based on skip limit u pass to query

    ${host:port}/generate-records?startDate=2000-01-01&endDate=2021-04-30 - This api generates stub or mock data into the mongo db records collection based on the date in the query parameters

    ${host:port}/filter-records - This is real assignment api which filters the data and return based on the given payload

## Input Validation - Joi

    - we have used Joi library to validate the given input as middleware

## Data Exchange Format -

    - consumes = application/json
    - produces = application/json

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

```

```
