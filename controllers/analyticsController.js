const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");
//Get organ data
const organDetailsController = async (req, res) => {
  try {
    const organs = [
      "Liver",
      "Kidney",
      "Pancreas",
      "Heart",
      "Lungs",
      "Intestines",
      "Uterus",
      "Eyes",
    ];
    const organData = [];
    const organisation = new mongoose.Types.ObjectId(req.body.userId);
    //get single organ
    await Promise.all(
      organs.map(async (organ) => {
        //count total in
        const totalIn = await inventoryModel.aggregate([
          {
            $match: {
              organ: organ,
              inventoryType: "in",
              organisation,
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: "$quantity",
              },
            },
          },
        ]);
        //count total out
        const totalOut = await inventoryModel.aggregate([
          {
            $match: {
              organ: organ,
              inventoryType: "out",
              organisation,
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: "$quantity",
              },
            },
          },
        ]);
        //calculate total
        const availableOrgan =
          (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

        //PUSH DATA
        organData.push({
          organ,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          availableOrgan,
        });
      })
    );
    return res.status(200).send({
      success: true,
      message: "Organ Data Fetch Successfully",
      organData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Bloodgroup Data Analytics API",
      error,
    });
  }
};

module.exports = { organDetailsController };
