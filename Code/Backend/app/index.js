const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 4000;
const dotenv = require('dotenv')
const cors = require('cors')
app.use(cors());
app.use(express.json());
mongoose.connect("YOUR MONGODB URL")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));


const newUserSchema = new mongoose.Schema({
  username: { type: String },
  userpassword: { type: String }
})

const newEmployeeSchema = new mongoose.Schema({

  f_id: { type: Number },
  f_image: { type: String },
  f_Name: { type: String },
  f_Email: { type: String },
  f_Mobile: { type: Number },
  f_Designation: { type: String },
  f_Gender: { type: String },
  f_Course: { type: String },
  f_Createdate: { type: Date, default: Date.now }
})
const Employee = mongoose.model('t_Employee', newEmployeeSchema)

const User = mongoose.model('t_login', newUserSchema);
app.post('/loginuser', async (req, res) => {
  const { username, userpassword } = req.body;
  try {
    // Find user in the database
    const user = await User.findOne({ username, userpassword });
    if (user) {
      return res.json({ message: "Login successful!", user });
    } else {
      return res.json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
})

app.post('/employee', async (req, res) => {
  const { f_id, f_image, f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } = req.body;

  try {
    // Check for duplicate email
    const existingEmployee = await Employee.findOne({ f_Email });
    
    if (existingEmployee) {
      return res.status(400).json({ message: 'Email already exists' }); // Return an error if email exists
    }

    const newEmployee = new Employee({
      f_id,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course
    });

    await newEmployee.save();
    return res.json({ message: 'Employee created' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' }); // Return a 500 status on server error
  }
});


app.get('/getemployee', async (req, res) => {
  try {
    const employeeData = await Employee.find()
    return res.json(employeeData)
    return res.json({ message: "Employee data fetched" })
  }
  catch (error) {
    console.log(error)
  }
})

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
