import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

// firstName
// lastName
// email
// password
//   age
//   picturePath
//   location
//   occupation

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    age: {
      type: Number,
      required: true,
    },
    picturePath: {
      type: String,
      default: "",
    },
    location: String,
    occupation: String,
  },
  { timestamps: true }
);

UserSchema.statics.signup = async function (data) {
  const { firstName, lastName, email, password, age, ...others } = data;
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("Email already in use");
  }
  if (!email || !password || !firstName || !lastName) {
    throw new Error("all fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw new Error("email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("password not strong enough");
  }
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    firstName,
    lastName,
    email,
    age: +age,
    password: hash,
    ...others,
  });

  return user;
};

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fileds must be filled.");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("incorrect password");
  }
  return user;
};

const User = mongoose.model("User", UserSchema);

export default User;
