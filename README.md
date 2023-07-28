# User-List-Digikick Project Documentation

This is the documentation for the User-List-Digikick project, which includes both backend and frontend implementations. The project is designed to manage a list of users with authentication functionality to control access to the user list. The backend is built with Node.js and Express, and the frontend is implemented using React.

## How the projects interface looks
### User Sign up Form
![Screenshot_55](https://github.com/TusharTechs/Users-List-Digikick/assets/56952465/85eed4c7-1060-4367-89ab-4adc12006866)

### Users List page
![Screenshot_50](https://github.com/TusharTechs/Users-List-Digikick/assets/56952465/eb09afaa-d79a-428a-a201-29d52b466164)

### Searching a user by username
![Screenshot_52](https://github.com/TusharTechs/Users-List-Digikick/assets/56952465/7ea81683-f419-459e-b35d-f0c6f164e4ed)

### Sorting users by username
![Screenshot_53](https://github.com/TusharTechs/Users-List-Digikick/assets/56952465/64599700-f2e0-4afa-b095-fdbdd7569bca)

### Updating User Details
![Screenshot_54](https://github.com/TusharTechs/Users-List-Digikick/assets/56952465/c53f2ee1-da80-4320-8b15-d77fb7c92fe1)


## Backend

### Routes

The backend provides the following API routes to manage users:

- **Get all users**: `GET /users`

  This route retrieves all users from the database and returns them as a JSON array.

- **Create a user**: `POST /users`

  This route allows the creation of a new user by sending the necessary user data in the request body. Upon successful creation, it returns the newly created user as a JSON object.

- **Get a user by id**: `GET /users/:userid`

  This route fetches a specific user from the database based on the provided `userid` parameter and returns it as a JSON object.

- **Update a user by id**: `PUT /users/:userid`

  This route allows updating an existing user by providing the `userid` parameter and sending the updated user data in the request body. The updated user is returned as a JSON object.

- **Delete a user by id**: `DELETE /users/:userid`

  This route allows deleting a user based on the provided `userid` parameter. Upon successful deletion, it returns a success message.

### Authentication

The project implements authentication functionality to restrict access to certain routes. Only registered users can view and make changes to the user list. The backend uses JSON Web Tokens (JWT) for user authentication.

## Frontend

The frontend of the User-List-Digikick project is built using React and communicates with the backend API to manage users. The frontend provides the following routes:

- **Sign up form**: [`http://localhost:3000`](http://localhost:3000)

  The signup form allows new users to register and create an account. Upon successful signup, users are redirected to the user list page.

- **User list page**: [`http://localhost:3000`](http://localhost:3000)

  After successful signup or login, users are redirected to the user list page. This page displays a list of users with the following functionalities:

  - Display all users in the database.
  - Search users by username using a search input field.
  - Sort users by username in ascending or descending order.
  - Pagination to display 9 users per page.

- **Edit user page**: [`http://localhost:3000/:userid`](http://localhost:3000/:userid)

  Users can access this page by clicking on an individual user card from the user list page. This page allows users to edit the details of a specific user and update it in the database.

### Proxy Configuration

To enable communication between the frontend and backend, a proxy has been set up in the frontend application. The frontend communicates with the backend routes using the following proxy configuration:

Proxy: http://localhost:5000

## Getting Started

To run the User-List-Digikick project locally, follow these steps:

1. Clone the repository from GitHub.

2. Set Up MongoDB Database:

i) Install MongoDB on your machine by following the official installation guide for your operating system: [MongoDB Installation Guide](https://docs.mongodb.com/manual/administration/install-community/).
ii) Once MongoDB is installed, start the MongoDB server. The default port is 27017.

3. Navigate to the project root directory and install the backend dependencies:
### cd backend
### npm install

4. Start the backend server:
### node index.js

The backend will start running at http://localhost:5000.

5. In a new terminal, navigate to the frontend directory and install the frontend dependencies:
### cd frontend
### npm install

6. Start the frontend development server:
### npm start
The frontend will be accessible at http://localhost:3000.

### Note: Ensure you have both Node.js and npm installed on your machine before running the project.

## Conclusion
The User-List-Digikick project provides a user-friendly interface for managing users with features like signup, login, user list display, search, sorting, and pagination. The backend securely handles user data with authentication using JWT tokens. With this documentation, you are now ready to use and contribute to the User-List-Digikick project on GitHub. Happy coding!
