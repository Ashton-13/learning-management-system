# Science Academy 🛸

## About
A full-stack Learning Management System built with **Django REST Framework** (backend) and **React** (frontend).
Deployed using **Render** and **Netlify**.

---

## Live Demo 
- Frontend: https://bright-treacle-9222ce.netlify.app
- Backend: https://learning-management-system-spwg.onrender.com

## Features

### Authentication
- User registration & login (JWT Authorization)
- Role-based access
- Protected Routes

### Teacher Features
- Create courses
- Edit courses
- Delete couses
- View all created courses

### Student Features
- Browse available courses
- View enrolled courses through student dashboard
- Track progress of courses through a mark as completed button

### UI
- Responsive dashboard layout

---

## Installation

### Backend

1. Navigate into the backend folder:

```bash
cd backend
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
```

On Windows:

```bash
venv\Scripts\activate
```

3. Install backend dependencies:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file inside the backend folder and add:

```env
SECRET_KEY=your_secret_key_here
DEBUG=True
```

For deployment, `DEBUG` should be set to `False`.

5. Run database migrations:

```bash
python manage.py migrate
```

6. Start the Django development server:

```bash
python manage.py runserver
```

### Frontend

1. Navigate into the frontend folder:

```bash
cd frontend
```

2. Install frontend dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```
## Environment Variables

The project uses environment variables to keep sensitive settings out of GitHub.

Backend environment variables:

| Variable | Description |
|---|---|
| `SECRET_KEY` | Django secret key used for security. |
| `DEBUG` | Controls debug mode. Use `False` in production. |

## API Endpoints

The backend API is built with Django REST Framework and uses JWT authentication for protected routes.

### Authentication and User Endpoints

| Method | Endpoint              | Description                                                                        | Access              |
| ------ | --------------------- | ---------------------------------------------------------------------------------- | ------------------- |
| POST   | `/api/register/`      | Register a new user. New users are created with the student role by default.       | Public              |
| POST   | `/api/token/`         | Log in and receive JWT access and refresh tokens.                                  | Public              |
| POST   | `/api/token/refresh/` | Refresh an access token using a refresh token.                                     | Public              |
| GET    | `/api/me/`            | Return the currently logged-in user's details, including username, email and role. | Authenticated users |

### Course Endpoints

| Method | Endpoint                | Description                                                                                     | Access        |
| ------ | ----------------------- | ----------------------------------------------------------------------------------------------- | ------------- |
| GET    | `/api/courses/`         | View all available courses. Public users can browse courses before logging in.                  | Public        |
| POST   | `/api/courses/`         | Create a new course.                                                                            | Teacher/Admin |
| GET    | `/api/courses/<id>/`    | View details for a single course.                                                               | Public        |
| PUT    | `/api/courses/<id>/`    | Fully update a course. Teachers can update their own courses. Admins can update any course.     | Teacher/Admin |
| PATCH  | `/api/courses/<id>/`    | Partially update a course. Teachers can update their own courses. Admins can update any course. | Teacher/Admin |
| DELETE | `/api/courses/<id>/`    | Delete a course. Teachers can delete their own courses. Admins can delete any course.           | Teacher/Admin |
| GET    | `/api/teacher/courses/` | View courses created by the logged-in teacher.                                                  | Teacher/Admin |
| GET    | `/api/admin/courses/`   | View all courses for admin course management.                                                   | Admin         |

### Enrolment and Student Progress Endpoints

| Method | Endpoint                             | Description                                                                    | Access  |
| ------ | ------------------------------------ | ------------------------------------------------------------------------------ | ------- |
| POST   | `/api/enroll/`                       | Enrol the logged-in student onto a course.                                     | Student |
| GET    | `/api/my-courses/`                   | View courses the logged-in student is enrolled in.                             | Student |
| PATCH  | `/api/courses/<id>/toggle-complete/` | Toggle the logged-in student's course status between complete and in progress. | Student |

### Admin User Management Endpoints

| Method | Endpoint           | Description                                                                                       | Access |
| ------ | ------------------ | ------------------------------------------------------------------------------------------------- | ------ |
| GET    | `/api/users/`      | View all registered users.                                                                        | Admin  |
| GET    | `/api/users/<id>/` | View details for a single user.                                                                   | Admin  |
| PUT    | `/api/users/<id>/` | Fully update a user's username, email or role.                                                    | Admin  |
| PATCH  | `/api/users/<id>/` | Partially update a user's username, email or role.                                                | Admin  |
| DELETE | `/api/users/<id>/` | Delete a user account. Admin self-deletion and protected admin deletion are prevented for safety. | Admin  |

### Django Admin and Browsable API

| Method | Endpoint            | Description                                 | Access                        |
| ------ | ------------------- | ------------------------------------------- | ----------------------------- |
| GET    | `/admin/`           | Django admin panel for database management. | Superuser/Admin               |
| GET    | `/api-auth/login/`  | Django REST Framework browsable API login.  | Authenticated browser session |
| GET    | `/api-auth/logout/` | Django REST Framework browsable API logout. | Authenticated browser session |

### Authorization

Protected endpoints require a JWT access token in the request header:

```text
Authorization: Bearer <access_token>
```

### User Roles

| Role    | Permissions                                                                                        |
| ------- | -------------------------------------------------------------------------------------------------- |
| Student | Browse courses, enrol in courses, view enrolled courses, and mark courses complete or in progress. |
| Teacher | Create courses, view own courses, edit own courses, and delete own courses.                        |
| Admin   | Manage users, manage all courses, and access the admin dashboard.                                  |


## Wireframes
## Home Page
<img width="4560" height="2786" alt="image" src="https://github.com/user-attachments/assets/d058d0d2-5f0c-4cf3-9e09-b6aeb93ffb17" />

## Browse Courses
<img width="4560" height="2786" alt="image" src="https://github.com/user-attachments/assets/a5cc424e-6f22-4104-9ee6-4f409f008935" />

## Teacher Dashboard
<img width="4560" height="2786" alt="image" src="https://github.com/user-attachments/assets/1f947ae6-8bab-43a7-8901-4656b0e00785" />

## Student Dashboard
<img width="4560" height="2786" alt="image" src="https://github.com/user-attachments/assets/4598ec6e-6edf-4144-86b8-c39f42762da0" />

## Validations

### CSS Validation

<img width="1892" height="1004" alt="image" src="https://github.com/user-attachments/assets/44f4e99b-91f7-42c9-a60c-53df8d0c5396" />


### HTML Validation

<img width="1909" height="576" alt="image" src="https://github.com/user-attachments/assets/ea9f5c01-0818-4b79-9fb7-d9621f8d15dc" />


