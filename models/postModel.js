const mongoose = require("mongoose"); // Erase if already required
const paginate = require("mongoose-paginate-v2");

// Declare the Schema of the Mongo model
var postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    imgUrls: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

postSchema.plugin(paginate);

//Export the model
module.exports = mongoose.model("Post", postSchema);
