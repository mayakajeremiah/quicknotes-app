# QuickNotes

QuickNotes is a simple responsive note-taking web app built with HTML, CSS and JavaScript. It allows users to create notes, assign each note to a Personal, Work or Study category, search notes in real time, delete notes, validate note length, and keep notes saved in the browser with localStorage so they survive page refreshes.

## Features

- Add notes with Personal, Work and Study categories.
- Validate empty notes and notes longer than 200 characters.
- Display the note category and creation date/time.
- Delete individual notes.
- Search notes without case sensitivity.
- Display an accurate zero, one or many note count.
- Save notes to localStorage and restore them after refresh.
- Responsive layout for small screens.
- Safe rendering of user text with `createElement()` and `textContent`.

## How to run locally

1. Clone or download this repository.
2. Open the `quicknotes-app` folder in VS Code.
3. Open `index.html` with VS Code Live Server, or open `index.html` directly in a modern web browser.
4. Add a few notes and refresh the page to verify that localStorage persistence works.

No build tools or external dependencies are required.

## What I learned

- I learned how to structure a small web application using semantic HTML elements such as `header`, `main`, `section` and `footer`.
- I learned how to use Flexbox and media queries to create a responsive interface that works on smaller screens.
- I learned how JavaScript arrays of objects can represent application data and how functions can render that data into the page.
- I learned how to validate form input and respond to user events such as submitting a form, clicking Delete, and typing in a search box.
- I learned how `localStorage`, `JSON.stringify()` and `JSON.parse()` can be used to persist application data in the browser.
- I learned why `textContent` is safer than inserting user-provided text with `innerHTML`.
