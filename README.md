**TaskFlow API**

TaskFlow is a simple REST API built using **Node.js**, **Express**, and **MongoDB**.  
This project was created to practice backend fundamentals such as API creation, database integration, routing, and validation.

It follows a clean and modular structure inspired by standard Node.js best practices.

- Features

1. Express server setup
2. MongoDB connection using Mongoose
3. Modular routing structure
4. RESTful API endpoints
5. Data validation using Joi
6. Tested using Postman

- Tech Stack

1. Node.js
2. Express.js
3. MongoDB
4. Mongoose
5. Joi

- Project Structure

taskflow/
│
├── middleware/        # Custom middlewares
│   ├── auth.js        # Authentication middleware (future use)
│   ├── error.js       # Centralized error handling
│   └── logger.js      # Request / activity logging
│
├── models/            # Mongoose schemas
│   └── task.js
│
├── routes/            # API routes
│   └── tasks.js
│
├── startup/           # Application startup logic
│   └── routes.js
│
├── index.js           # Entry point of the application
├── package.json
├── .gitignore
└── README.md

- How to Run the Project
1. Clone the repository
2. Install dependencies 
        npm install
3. Start MongoDB : Make sure MongoDB is running locally.
4. Run the server
        node index.js
5. The server will start on: http://localhost:3000  (you can view it on your browser)

- API Testing

All APIs were tested using Postman. Example: http://localhost:3000/api/tasks

- Purpose
This project was built as part of learning backend development fundamentals.
It focuses on clarity, structure, and correct implementation of core concepts rather than advanced features.

- Future Improvements

1. User authentication (JWT)
2. Password hashing (bcrypt)
3. Environment variables (dotenv)
4. Role-based access control


  
