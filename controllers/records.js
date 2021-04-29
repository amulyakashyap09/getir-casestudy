const service = require("../services/records");

module.exports.fetchAllRecords = async (req, res, next) => {
  try {
    const records = await service.findAll();
    res.send(records);
  } catch (error) {
    next(error);
  }
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
    const responseObj = {
      code: 0,
      msg: "Success",
      records: records.map((obj) => ({
        key: obj.key,
        createdAt: obj.createdAt,
        totalCount: obj.totalCount,
      })),
    };
    res.send(responseObj);
  } catch (error) {
    next(error);
  }
};
