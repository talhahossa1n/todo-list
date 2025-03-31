# ToDo List

A Node.js to-do list application built with Express, EJS, and MongoDB (using Mongoose) that allows users to manage tasks on a default list ("Today") as well as on custom lists accessed via dynamic routes. It also features an About page and responsive CSS styling.

## Project Overview

- **Backend:** Node.js, Express, and Mongoose for database operations.
- **Templating:** EJS for dynamic HTML generation.
- **Styling:** Bootstrap and custom CSS for a responsive, modern UI.
- **Utilities:** Lodash for string manipulation (e.g., capitalizing list names) and a custom date module for formatted dates.

## Folder Structure

```
todo-list/
├── app.js             // Main server file and routing logic
├── date.js            // Module for formatting and returning the current date
├── package.json       // Project dependencies and scripts
├── .gitignore         // Ignored files (e.g., node_modules)
├── README.md          // Project documentation
├── public/
│   └── css/
│       └── style.css  // Custom styles
└── views/
    ├── about.ejs      // About page template
    ├── list.ejs       // Main to-do list template
    ├── header.ejs     // Header partial
    ├── footer.ejs     // Footer partial
```

## Setup & Installation

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/your-username/todo-list.git
   ```
2. **Navigate to the Project Directory:**
   ```sh
   cd todo-list
   ```
3. **Install Dependencies:**
   ```sh
   npm install
   ```
4. **Configure MongoDB:**
   - Ensure MongoDB is running locally or update the connection string in `app.js` to use your MongoDB Atlas connection.
5. **Run the Application:**
   ```sh
   npm start
   ```
6. **Open in Browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

- **Home Page:** Displays today's date and the default to-do list. If no items exist, default items are inserted.
- **Custom Lists:** Access custom lists via dynamic routes (e.g., `/Work`) which are created automatically.
- **Add New Item:** Enter a new task on the home or custom list page to add it.
- **Delete Item:** Check an item to delete it from the list.
- **About Page:** Static page providing information about the app.

## Future Enhancements

- Integrate persistent storage (e.g., MongoDB Atlas) for robust data management.
- Implement user authentication for personalized to-do lists.
- Improve UI with additional animations and themes.
- Enhance mobile responsiveness further.

## License

This project is licensed under the **ISC License**.

## Author & Credits

**Md. Talha Hossain**  
Inspired by Angela Yu's web development course and teachings.
