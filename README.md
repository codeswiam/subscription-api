# Subscription Tracker API

This is a Subscription Tracker API built with Node.js, Express, and MongoDB. It allows users to manage their subscriptions, including creating, updating, and deleting subscriptions, as well as signing up and signing in.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/codeswiam/subscription-api.git
    cd subscription-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env.development.local` file and add your [Environment Variables](#environment-variables):
    ```sh
    touch .env.development.local
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```

## Usage

The API provides endpoints for managing users and subscriptions. You can use tools like Postman or cURL to interact with the API.

## API Endpoints

### Auth

- **POST /api/v1/auth/sign-up**: Sign up a new user
- **POST /api/v1/auth/sign-in**: Sign in an existing user
- **POST /api/v1/auth/sign-out**: Sign out the current user

### Users

- **GET /api/v1/users**: Get all users
- **GET /api/v1/users/:id**: Get a user by ID (requires authorization)
- **POST /api/v1/users**: Create a new user
- **PUT /api/v1/users/:id**: Update a user by ID (requires authorization)
- **DELETE /api/v1/users/:id**: Delete a user by ID (requires authorization)

### Subscriptions

(All of these require authorization)

- **POST /api/v1/subscriptions**: Create a new subscription 
- **GET /api/v1/subscriptions/:id**: Get a subscription by ID
- **GET /api/v1/subscriptions/user/:id**: Get all subscriptions of a user 
- **PUT /api/v1/subscriptions/:id**: Update a subscription by ID 
- **PUT /api/v1/subscriptions/:id/cancel**: Cancel a subscription by ID
- **DELETE /api/v1/subscriptions/:id**: Delete a subscription by ID
- **PUT /api/v1/subscriptions/upcoming-renewals**: Get upcoming renewals

### Workflows

- **GET /api/v1/workflows**: Get all workflows

## Environment Variables

The following environment variables are required:

- `PORT`: The port on which the server will run
- `DB_URI`: The MongoDB connection string
- `JWT_SECRET`: The secret key for JWT
- `JWT_EXPIRES_IN`: The expiration time for JWT
- `ARCJET_KEY`: The Arcjet key
- `ARCJET_ENV`: The Arcjet environment
- `QSTASH_URL`: The Upstash Qstash URL
- `QSTASH_TOKEN`: The Upstash Qstash token
- `QSTASH_CURRENT_SIGNING_KEY`: The current signing key for Qstash
- `QSTASH_NEXT_SIGNING_KEY`: The next signing key for Qstash