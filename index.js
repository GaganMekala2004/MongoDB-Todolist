import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const saltRounds = 10;

// Variable to simulate user authentication status (without sessions)
let isAuthenticated = false;
let currentUserId = null; // Variable to store the current user's ID

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

// Define the User and Task schemas
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const taskSchema = new mongoose.Schema({
  name: String,
  category: String,
  dueDate: Date,
  userId: mongoose.Schema.Types.ObjectId // Reference to the User
});

// Create the User and Task models
const User = mongoose.model("User", userSchema);
const Task = mongoose.model("Task", taskSchema);

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Redirect to the register page if not authenticated
app.get("/", (req, res) => {
  if (!isAuthenticated) {
    return res.redirect("/register"); // If not authenticated, redirect to register
  }
  res.redirect("/tasks"); // If authenticated, go to tasks
});

// Route for displaying tasks after login
app.get("/tasks", async (req, res) => {
  if (!isAuthenticated) {
    return res.redirect("/register"); // Redirect to register if not authenticated
  }

  const { filter = "All", search = "" } = req.query; // Default values
  let query = { userId: currentUserId }; // Set userId to the currently authenticated user's ID

  if (filter && filter !== "All") {
    query.category = filter; // Filter by category if specified
  }
  if (search) {
    query.name = { $regex: search, $options: "i" }; // Case-insensitive search
  }

  // Get tasks based on filters (if any)
  const tasks = await Task.find(query);
  res.render("index", { tasks, filter, search }); // Pass filter and search to the template
});

// Register route
app.get("/register", (req, res) => {
  res.render("register"); // Display the registration page
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.send("Email already exists. Try logging in.");
  }

  // Hash and salt the password
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.send("Error registering. Please try again.");
    }

    // Create and save the new user
    const newUser = new User({ email, password: hash });
    await newUser.save();
    isAuthenticated = true; // Simulate authentication after registration
    currentUserId = newUser._id; // Store the newly created user's ID
    res.redirect("/tasks"); // Redirect to tasks page after registration
  });
});

// Login route
app.get("/login", (req, res) => {
  res.render("login"); // Display the login page
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.send("User not found.");
  }

  // Compare the hashed password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      console.error("Error comparing passwords:", err);
      return res.send("Error logging in. Please try again.");
    }

    if (result) {
      isAuthenticated = true; // Simulate authentication on successful login
      currentUserId = user._id; // Store the authenticated user's ID
      res.redirect("/tasks"); // Login successful, redirect to tasks
    } else {
      res.send("Incorrect password.");
    }
  });
});

// Add task route
app.post("/add-task", async (req, res) => {
  const { task, category, dueDate } = req.body;

  const newTask = new Task({
    name: task,
    category,
    dueDate: new Date(dueDate),
    userId: currentUserId // Set userId to the currently authenticated user's ID
  });

  await newTask.save();
  res.redirect("/tasks");
});

// Delete task route
app.post("/delete-task", async (req, res) => {
  const { taskId } = req.body;
  await Task.findByIdAndDelete(taskId);
  res.redirect("/tasks");
});

// Edit task name route
app.post("/edit-task", async (req, res) => {
  const { taskId, updatedTaskName } = req.body;
  await Task.updateOne({ _id: taskId }, { name: updatedTaskName });
  res.redirect("/tasks");
});

// Edit due date route
app.post("/edit-due-date", async (req, res) => {
  const { taskId, updatedDueDate } = req.body;
  await Task.updateOne({ _id: taskId }, { dueDate: new Date(updatedDueDate) });
  res.redirect("/tasks");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
