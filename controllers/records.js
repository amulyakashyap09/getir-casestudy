const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const service = require("../services/records");

module.exports.fetchAllRecords = async (req, res, next) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 100;
    const records = await service.findAll(skip, limit);
    if ("error" in records && records.error) {
      res.status(400).json(records);
    } else {
      res.status(200).json({ records: records.data });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.generateRecords = async (req, res, next) => {
  try {
    const records = [];
    const keys = [];
    const a = moment(re.query.startDate) || moment("1820-01-01");
    const b = moment(re.query.endDate) || moment("2021-04-30");

    for (let i = 0; i < 10; i++) {
      keys.push(uuidv4());
    }

    for (let m = moment(a); m.isBefore(b); m.add(1, "days")) {
      const dt = m.format("YYYY-MM-DD");
      const obj = {
        key: keys[Math.floor(Math.random() * 10)],
        createdAt: moment(dt).utc().format(),
        updatedAt: moment(dt).utc().format(),
      };
      records.push(obj);
    }
    await service.bulkInsert(records);
    res.status(200).json({ records: records });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.welcome = async (req, res, next) => {
  res.status(200).json({
    title: "Welcome, to GETIR",
  });
};

module.exports.filterRecords = async (req, res, next) => {
  try {
    const { startDate, endDate, minCount, maxCount } = req.body;
    const pipelines = [
      {
        $match: {
          $and: [
            {
              createdAt: { $lte: new Date(endDate), $gte: new Date(startDate) },
            },
          ],
        },
      },
      { $unwind: "$counts" },
      {
        $group: {
          _id: "$_id",
          key: { $first: "$key" },
          createdAt: { $first: "$createdAt" },
          totalCount: {
            $sum: "$counts",
          },
        },
      },
      {
        $match: { $and: [{ totalCount: { $gte: minCount, $lte: maxCount } }] },
      },
    ];
    const records = await service.aggregate(pipelines);
    if ("error" in records && records.error) {
      console.error(records.error);
      res.status(400).json(records);
    } else {
      const responseObj = {
        code: 0,
        msg: "Success",
        records: records.data.map((obj) => ({
          key: obj.key,
          createdAt: obj.createdAt,
          totalCount: obj.totalCount,
        })),
      };
      res.status(200).json(responseObj);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
