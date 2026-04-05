The Financial Management Backend is a highly scalable, secure, and feature-rich RESTful API designed to manage enterprise or personal financial records.
It solves the problem of tracking income and expenses across different organizational tiers by providing a secure system with strict Role-Based Access Control (RBAC). It includes advanced features like complex database aggregations for dashboard analytics, soft-deletion for data integrity, and centralized error handling, making it a robust foundation for a modern web or mobile client.

A company uses it to:
- Track money (income & expenses)
- Analyze financial data
- Control who can access or modify data

🌍 📊 Real-World Scenario (Company Usage)
Imagine a startup or mid-size company.
They have daily expenses (rent, salaries, tools), income (clients, sales)
They need a system to:
✔ store financial data
✔ analyze it
✔ control access
👉 That’s exactly what our backend does.

👥 Who Uses It in a Company?

🛠️ 1. Admin (Finance Manager / Owner)
This person manages all financial data, controls users
What they do:
- Add income/expense records
- Update or delete wrong entries
Create users (analysts/viewers)
👉 Example:
“Salary paid: ₹50,000”
“Office rent: ₹20,000”

📊 2. Analyst (Data Analyst / Accountant)
This person analyzes financial data
What they do:
- check spending patterns
- generate insights
- filter data
👉 Example:
“How much did we spend on marketing this month?”

👀 3. Viewer (CEO / Stakeholder)
This person only wants high-level insights
What they do:
- view dashboard
- check profits/loss
👉 Example:
“Are we making profit this month?”


📌 Tech Stack
Backend Framework: Node.js with Express.js (ES Modules)
Database: MongoDB with Mongoose ORM
Authentication: JSON Web Tokens (JWT) & bcryptjs for password hashing
Validation: Joi (Schema-based payload validation)
Security: Helmet, CORS, Express Rate Limit
Logging: Morgan & Custom Console Logger


📌 System Architecture
This project implements a Layered (Modular) Architecture to ensure a clear separation of concerns, making the codebase highly maintainable and testable.

<img width="844" height="355" alt="image" src="https://github.com/user-attachments/assets/8964d11e-cf45-40c1-916b-eaddae3fd316" />

This diagram shows how the application is separated into distinct layers, following the Domain-Driven / Layered Architecture approach.

<img width="511" height="759" alt="image" src="https://github.com/user-attachments/assets/47100dd8-c5be-449b-87af-0ade10e8d80c" />

Mermaid graph TD
    Client[Client Application] -->|HTTP JSON| Router[Express Router /routes]
    
    subgraph Express Backend
        Router --> MW[Middlewares: Auth, Role, Joi]
        MW --> Ctrl[Controllers /controllers]
        Ctrl --> Svc[Services /services]
        Svc --> Mdl[Models /models]
        
        Utils[Utilities /utils] -.->|Used by| Ctrl
        Utils -.->|Used by| MW
    end
    
    Mdl -->|Mongoose Queries| DB[(MongoDB)]


🔄 Request Flow (Lifecycle of an API Call)
Client Request ➔ Route ➔ Middleware (Auth/Role/Validation) ➔ Controller ➔ Service (Business Logic) ➔ Model ➔ Response sent to Client

This diagram tracks a single request (e.g., POST /api/records) from the moment the client sends it, through the security checks, to the database, and back to the client.

<img width="676" height="660" alt="image" src="https://github.com/user-attachments/assets/6d59c080-17e8-4e57-bd68-7161727d86eb" />

Mermaid.js Sequence Diagram 
sequenceDiagram
    participant Client
    participant Route
    participant Middleware
    participant Controller
    participant Service
    participant Database

    Client->>Route: POST /api/records
    Route->>Middleware: Trigger Auth, Role, Validation
    
    alt Invalid Token
        Middleware-->>Client: 401 Unauthorized
    else Not Admin
        Middleware-->>Client: 403 Forbidden
    else Invalid Body Data
        Middleware-->>Client: 400 Bad Request
    end
    
    Middleware->>Controller: req.body & req.user (Passed Checks)
    Controller->>Service: Pass Data to Business Logic
    Service->>Database: Mongoose.create(data)
    
    alt Database Error
        Database-->>Service: Throw Error
        Service-->>Controller: Throw AppError
        Controller-->>Client: 500 Internal Server Error
    else Success
        Database-->>Service: Return saved Document
        Service-->>Controller: Return formatted Data
        Controller-->>Client: 201 Created (JSON Response)
    end


📌 Features Implemented

🔐 Authentication: Secure user registration and login using JWT. Passwords are one-way hashed using bcryptjs before hitting the database.

🛡️ Role-Based Access Control (RBAC): Middleware dynamically checks user roles to grant or deny access to specific endpoints.

📄 Pagination: Listing APIs (Users, Records) implement page & limit queries to optimize database reads and payload sizes.

🔍 Search & Filtering: API supports dynamic query parameters to filter financial records by date, category, type, and text-based searching.

🗑️ Soft Delete: Records and users are never permanently deleted from the database. An isDeleted flag is toggled, preventing accidental data loss and preserving historical audit trails.

⏱️ Rate Limiting: Protects the API from brute-force and DDoS attacks by limiting IP request frequencies.

✅ Input Validation: Middleware intercepts bad data using Joi schemas before it reaches the controller, saving server resources.

⚠️ Centralized Error Handling: All operational errors and unhandled exceptions are routed through a single global error handler, ensuring consistent JSON error responses.



📌 User Roles & Workflow

The system enforces strict data governance through three defined roles:

👑 Admin: Has full control. Can create, read, update, and delete financial records. Can also view all users and manage their roles/account statuses.

📊 Analyst: Has read-only access to financial records and can access complex dashboard aggregations/summaries. Cannot create or modify data.

👀 Viewer: The default role upon registration. Cannot access financial records until upgraded by an Admin.



🚶 Real-Life Workflow

A new user signs up and is assigned the Viewer role.

An Admin logs in, views the user list, and upgrades the new user to Analyst.

The Analyst fetches dashboard summaries to review monthly income vs. expenses.

The Admin creates a new Expense record.

If an Admin deletes the record, the system marks it as isDeleted: true instead of dropping the row, keeping financial history intact.



📌 API Structure

🔑 Auth Module

Method	Endpoint	Purpose	Access

POST	/api/auth/register	Register a new user	Public

POST	/api/auth/login	Authenticate user & get JWT	Public

👥 User Module

Method	Endpoint	Purpose	Access

GET	/api/users	Get paginated list of users	Admin

PATCH	/api/users/:id/status	Activate/Deactivate user	Admin

PATCH	/api/users/:id/role	Change user role	Admin

DELETE	/api/users/:id	Soft delete a user	Admin

💰 Financial Records Module

Method	Endpoint	Purpose	Access

GET	/api/records	Get records (Supports search/filter)	Admin, Analyst

POST	/api/records	Create a new financial record	Admin

PATCH	/api/records/:id	Update a specific record	Admin

DELETE	/api/records/:id	Soft delete a record	Admin

📈 Dashboard Module

Method	Endpoint	Purpose	Access

GET	/api/dashboard/summary	Get aggregated totals, balances & trends	Admin, Analyst


📌 Installation & Setup
1. Clone the Repository
Bash
git clone https://github.com/anshikait/Finance-Dashbaord-System
cd financial-backend

3. Install Dependencies
Bash
npm install

5. Setup Environment Variables
Create a .env file in the root directory and add the required variables (see section below).

7. Run the Server
Bash
# For development (auto-reloads on save)
npm run dev

# For production
npm start
The server will start at http://localhost:5000.


📌 Environment Variables
Create a .env file in the project root:
PORT=5000

NODE_ENV=development

# Database
MONGO_URI=mongodb://127.0.0.1:27017/financial_db 
                    OR
MongoDB Atlas

# Authentication
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=1d


📌 Testing via Postman
A complete Postman test suite has been designed for this API.
Open Postman and click Import.
Paste the provided Postman Collection JSON code.
Automated Workflow:
Run the Register Admin User or Login User request.
Postman will automatically capture the JWT token and save it to the environment variables.
All subsequent protected routes will automatically use this token. No manual copying is required!

Step 1: How to Import it into Postman
Open Postman.
In the top-left corner, click the "Import" button.
Select the "Raw text" tab (or save the JSON above into a file named Financial-Backend.postman_collection.json and drag-and-drop it).
Paste the JSON and click Import.
You will now see a collection named "Financial Fullstack Backend APIs" in your workspace.

Step 2: How to Run and Test the APIs Automatically
Ensure your local Node.js server is running (npm run dev).
Open the 
1. Authentication folder in Postman.
Click on Register Admin User and hit Send.
Notice in the response that the user is created. Behind the scenes, Postman automatically grabbed the JWT token from the response and saved it to the auth_token variable!
Now open the 
2. User Management folder.
Click Get All Users and hit Send.
Because the token was saved, this request will automatically authorize you. The test script will also grab the very first User's ID and save it to the test_user_id variable.
Open Update User Role and hit Send.
It will automatically use the test_user_id to update that user.
You can proceed down the list, clicking Send on each endpoint. They are designed to be clicked in chronological order to perfectly simulate a user's flow in your app.

Features Validated in this Collection:
Token Extraction: Done in Register and Login.
ID Extraction: Done in Get All Users and Create Valid Record so PATCH and DELETE requests work instantly.
Pagination & Search: Demonstrated in the Get Records (Search & Filter) request using Query Params.
Soft Delete: Validated by the DELETE requests returning a 200 but not physically dropping the table rows.
Validation Errors: Covered in Create Record (Validation Error Test) expecting a 400 status.
Auth Guard: Covered in Access Route Without Token expecting a 401.


📌 Project Workflow & Data Flow
Authentication Flow: The client submits credentials to /auth/login. The Service validates the hash and generates a JWT.
Authorization Flow: The client attaches the JWT to the Authorization: Bearer <token> header. The protect middleware verifies the token and attaches the User object to the request.
RBAC Validation: The restrictTo('Admin') middleware checks req.user.role. If unauthorized, it throws a 403 error.
Data Processing: The Controller receives the validated payload and passes it to the Service layer.
Database Interaction: The Service executes Mongoose queries (e.g., Aggregations for the dashboard) and returns the data format to the controller.


📌 Future Improvements

Caching Layer: Integrate Redis to cache dashboard summaries and improve read latency.

Unit Testing: Add Jest & Supertest for automated controller and service testing.

API Documentation: Integrate Swagger UI for interactive developer documentation.

Export Feature: Add functionality to generate and download financial reports in CSV/PDF formats.

Dockerization: Create a Dockerfile and docker-compose.yml for seamless deployment.




