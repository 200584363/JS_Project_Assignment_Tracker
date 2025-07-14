### Project Overview:
Assignment Tracker is a full-stack web application that allows authenticated users to manage their assignments. Users can register, log in (via username/password or GitHub), create, edit, delete, and view their assignments. Each assignment can include a file upload (PDF/DOC/etc.) and a due date. This project demonstrates CRUD functionality, user authentication, file handling, and deployment.

Features Implemented:
- User Registration/Login
- GitHub OAuth Login
- Protected Routes using Passport
- Full CRUD: Create, Read, Update, Delete assignments
- File Uploads for Assignments
- Flash messages (e.g., Login failed, Already exists)
- Logged-in user sees only their own assignments
- Clean, responsive Bootstrap UI

### Tech Stack Summary:

- Frontend (UI): HBS (Handlebars), Bootstrap
- Backend (Server): Express.js
- Database: MongoDB (hosted on Atlas)
- Authentication: Passport.js with passport-local and passport-github2
- File Uploads: Multer
- Deployment: Render

### Technology Stack & Project Structure:
Here is a list of dependencies installed using npm install and why they are used:

- express: Web framework to create server and handle routing
- hbs: Handlebars.js view engine for rendering HTML templates
- mongoose: ODM (Object Data Modeling) tool to interact with MongoDB
- dotenv: Loads environment variables from .env file for security
- express-session: Maintains user login sessions securely
- passport: Authentication middleware for Node.js
- passport-local: Local strategy for username/password login
- passport-github2: GitHub login strategy for Passport
- connect-flash: Flash messages for feedback like "Login failed"
- bcrypt: Hashes passwords securely before saving to DB
- method-override: Allows HTML forms to send PUT and DELETE requests
- multer: Middleware to handle file uploads (PDFs, DOCs, etc.)

### Project Structure:
```bash
assignment-tracker/
├── app.js                       # Main app setup file
├── bin/
│   └── www                     # Starts the server
├── config/
│   ├── db.js                   # MongoDB connection logic
│   └── passport.js             # Passport authentication configuration
├── models/
│   ├── User.js                 # User schema
│   └── Assignment.js           # Assignment schema
├── routes/
│   ├── index.js                # Home route
│   ├── auth.js                 # Login, Register, GitHub Auth, Logout
│   └── assignments.js          # CRUD for assignments
├── views/
│   ├── layouts/
│   │   └── layout.hbs          # Base HTML layout
│   ├── partials/
│   │   ├── header.hbs          # Navigation bar
│   │   └── footer.hbs          # Footer
│   ├── home.hbs
│   ├── login.hbs
│   ├── register.hbs
│   └── assignments/
│       ├── list.hbs            # Assignment table
│       ├── create.hbs          # Create assignment form
│       └── edit.hbs            # Edit assignment form
├── public/
│   ├── stylesheets/
│   │   └── style.css           # Your custom CSS
│   └── uploads/                # Uploaded assignment files (PDFs/DOCs)
├── .env                        # Environment variables (SECRET, DB URI, GitHub Keys)
├── package.json
└── README.md
```

### Environment Variables (.env)
```bash
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_strong_session_key
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_secret
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
```

### Summary:
This application is built using the Express framework, HBS view engine, and MongoDB. It supports user authentication using Passport.js (local and GitHub OAuth), file uploads via Multer, and flash messaging. The folder structure is modular, separating concerns into models, routes, views, and configuration. This improves maintainability and scalability. Sensitive keys are managed securely using .env variables. Deployment is done using Render (or another cloud platform).
