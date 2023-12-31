const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollnum: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  linkT: {
    type: String,
    required: false,
  },
  number: {
    type: Number,
    required: true,
  },
  clubs: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// we are hashing the password

studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

studentSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token:token})
    await this.save();
    return token;

  } catch (err) {
    console.log(err);
  }
};

const Student = mongoose.model("STUDENT", studentSchema);
module.exports = Student;
