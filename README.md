# getir-casestudy

- ![#FF0000](https://via.placeholder.com/15/FF0000/000000?text=+) `Your GIVEN mongodb uri is not working and is throwing **user not allowed to perform any action** error.`

- ![#228B22](https://via.placeholder.com/15/228B22/000000?text=+) So I have used local mongodb connection and given api to populate the stub and try the API

- ![#FFFF00](https://via.placeholder.com/15/FFFF00/000000?text=+) VIDEO LINK FOR DEMO : [DEMO_VIDEO](https://drive.google.com/file/d/1y4tnZ0dOn4xMOU3g7jCsYWiEUCpVE7PD/view?usp=sharing)

## Server :

    - host: localhost
    - port: 3000

## Database :

    - Database - getircase-study
    - Uri - mongodb://localhost:27017/getircase-study
    - Collection - records

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
db.getCollection('records').aggregate([{
  $match: {
    $and: [
      {
        createdAt: { $lte: new Date("2018-01-26"), $gte: new Date("2016-01-26") },
      },
    ],
  },
},{
  $group: {
    _id: "$key",
    key: { $first: "$key" },
    createdAt: { $first: "$createdAt" },
    totalCount: {
      $sum: 1,
    },
  },
},{
  $match: { $and: [{ totalCount: { $gte: 100, $lte: 1000 } }] },
},])
```

### API TEST COVERAGE

- We have used JEST and supertest to test our api and write few test cases.
