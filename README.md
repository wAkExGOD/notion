# Notion

![image](https://github.com/user-attachments/assets/63b5a1c9-08d9-472c-88b3-9b16149b9517)

## Project Description

Notion is a web application developed using React and TypeScript, designed for note management.
The project uses json-server to create a mock database and Tailwind CSS for styling, as well as the shadcn/ui library for the user interface.

## Application Pages

The application includes the following pages:

- **Home Page**: `/`
- **Registration**: `/registration`
- **Log In**: `/log-in`
- **Notes**:
  - **Notes List**: `/notes`
  - **Create Note**: `/notes/create`
  - **Edit Note**: `/notes/edit/:id`
  - **Note**: `/notes/:id`

## Installation and Running

To run the project, follow these steps:

1. Start the database (json-server):
   ```bash
   pnpm dev:db
   ```
2. Start the frontend:
   ```bash
   pnpm dev
   ```

## Technologies Used
- **React**
- **TypeScript**
- **json-server**
- **Tailwind CSS**
- **shadcn/ui**
