const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var menuItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      default: null,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
      },
    ],
  },
  { timestamps: true }
);

menuItemSchema.post("save", async function (_, next) {
  await this.constructor.findOneAndUpdate(
    { _id: this.parent },
    { $addToSet: { children: this } }
  );
  next();
});

//Export the model
module.exports = mongoose.model("MenuItem", menuItemSchema);
