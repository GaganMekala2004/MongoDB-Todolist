Here’s a simple `README.md` for your To-Do List application:

```markdown
# To-Do List App

This is a simple To-Do List application built using Node.js, Express, MongoDB, and EJS. It allows users to register, log in, add tasks, and filter tasks by category or search for tasks by name.

## Features

- User registration and login using bcrypt for password hashing.
- Add, edit, and delete tasks.
- Filter tasks by category (Work, Personal, Urgent, Other).
- Search tasks by name.
- Task due dates.
- Task management per user.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Templating Engine**: EJS
- **Authentication**: bcrypt

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/todolistapp.git
   cd todolistapp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up MongoDB**:
   Make sure you have MongoDB installed and running on your machine. The app will connect to MongoDB running at `mongodb://127.0.0.1:27017/todolistDB`.

4. **Start the server**:
   ```bash
   npm start
   ```

5. **Access the app**:
   Open your browser and go to `http://localhost:3000`.

## Usage

### Register a new user:
- Go to the `/register` page, fill in your email and password, and click register.
- After registration, you will be redirected to the tasks page.

### Log in as an existing user:
- Go to the `/login` page, enter your email and password, and click login.

### Add a task:
- On the tasks page, fill in the task name, category, and due date, and click "Add Task."

### Search for tasks:
- Use the search bar at the top of the tasks page to search for tasks by name.

### Filter tasks by category:
- Use the dropdown to filter tasks by their category.

### Edit or delete tasks:
- You can edit a task's name or due date, or delete a task by clicking the relevant button.

## Folder Structure

```plaintext
todolistapp/
│
├── public/
│   └── styles/          # CSS files for styling
│
├── views/
│   ├── index.ejs        # Main task list page
│   ├── register.ejs     # Registration page
│   ├── login.ejs        # Login page
│   └── partials/        # Header/footer partials
│
├── models/
│   └── task.js          # Task schema and model
│
├── index.js             # Main server file
├── package.json         # Project dependencies and scripts
└── README.md            # This readme file
```

```

This is a basic `README` to help users set up, understand, and use your To-Do List application. It includes installation steps, an overview of features, and the folder structure.
