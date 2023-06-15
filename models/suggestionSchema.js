const { default: mongoose } = require("mongoose");

const suggestionSchema = new mongoose.Schema({

    rollNum: {
      type: Number,
      required: true,
    },
    club: {
      type: String,
      required: true,
    },
  suggest1:{
    type:String,
    required:true
  }
  });
  const Suggestion = mongoose.model("SUGGESTION", suggestionSchema);
module.exports = Suggestion;