const service = require("../services/records");

module.exports.fetchAllRecords = async (req, res, next) => {
  try {
    const records = await service.findAll();
    if ("error" in records && records.error) {
      res.status(400).json(records);
    } else {
      res.status(200).json(records.data);
    }
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
      res.status(400).json(records);
    } else {
      const responseObj = {
        code: 0,
        msg: "Success",
        records: records.map((obj) => ({
          key: obj.key,
          createdAt: obj.createdAt,
          totalCount: obj.totalCount,
        })),
      };
      res.status(200).json(responseObj);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
