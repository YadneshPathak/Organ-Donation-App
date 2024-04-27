const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    // donarName: {
    //   type: String,
    //   required: [true, "inventory type require"],
    // },
    inventoryType: {
      //this is for blood in and out
      type: String,
      required: [true, "inventory type require"],
      enum: ["in", "out"],
    },
    organ: {
      // change it to organs after words
      type: String,
      required: [true, "Organ to be mentoined"],
      enum: ["Liver", "Kidney", "Pancreas", "Heart", "Lungs", "Intestines", "Uterus", "Eyes"]
    },
    quantity: {
      type: Number,
      required: [true, "Organ quanity is require"],
    },
    email: {
      type: String,
      required: [true, "Donar Email is required"],
    },
    organisation: {
      // blood kaha se kha ja raha hai
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "organisation is required"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "out";
      },
    },
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "in";
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Inventory", inventorySchema);
