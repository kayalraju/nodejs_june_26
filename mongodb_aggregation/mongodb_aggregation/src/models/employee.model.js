const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employeeSchema = new Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: [true, "FirstName is required"],
    },
    lastname: {
      type: String,
      trim: true,
      required: [true, "Lastname is required"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
    },
    gender: {
      type: String,
      trim: true,
      enum: ["male", "female", "others"],
    },
    salary: {
      type: String,
      trim: true,
      required: [true, "Salary is required"],
    },
    department: {
      type: String,
      trim: true,
      required: [true, "Department is required"],
    },
  },
  {
    timestamps: true,
  },
);

const employeeModel = mongoose.model("employee", employeeSchema);
module.exports = employeeModel;
