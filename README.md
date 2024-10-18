
## Description

This is a backend application for managing a comic book inventory, built with Node.js, Express, MongoDB, and Zod for validation. It provides CRUD operations for comic books, with features like pagination, filtering, and sorting.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [API Endpoints](#api-endpoints)

## Prerequisites

Before you begin, ensure you have met the following requirements:

* Node.js (v14 or later)
* MongoDB (v4.4 or later)
* npm (usually comes with Node.js)
* Git (for cloning the repository)

## Installation

1. Clone the repository:

```
git clone https://github.com/your-username/Backend-Software-Development-Assignment.git
```


2. Navigate to the project directory:

```
cd Backend-Software-Development-Assignment
```


3. Install the dependencies:
```
npm install
```


## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:

```
PORT=3000
MONGO_URL=mongodb://localhost:27017/comic_book_inventory
```

Note: Adjust the `MONGO_URL` if your MongoDB is hosted elsewhere or uses different credentials.

## Running the Application

1. Ensure MongoDB is running on your system.

2. Start the application:
```
npm start
```

For development with auto-restart on file changes:

```
npm run dev
```

## API Endpoints

The API provides the following endpoints:

* `POST /api/v1/createComicBook`: Create a new comic book
* `GET /api/v1/getAllComicBooks`: Get all comic books (with pagination, filtering, and sorting)
* `GET /api/v1/getComicBook/:id`: Get a specific comic book
* `PATCH /api/v1/updateComicBook/:id`: Update a comic book
* `DELETE /api/v1/deleteComicBook/:id`: Delete a comic book

 ## API Collection Link

 This is a api collection in public workspace

 `https://www.postman.com/security-architect-36354480/workspace/public-workspace/collection/21425258-91b6cd69-ada4-4dfb-ab0f-8f244b0e8282?action=share&creator=21425258`

 
#### I have also added the json file for api collection
