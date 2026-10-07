const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

const STORAGE_KEY = "quicknotes-notes";

let notes = loadNotes();

function loadNotes() {
    const savedNotes = localStorage.getItem(STORAGE_KEY);

    if (!savedNotes) {
        return [];
    }

    try {
        const parsedNotes = JSON.parse(savedNotes);
        return Array.isArray(parsedNotes) ? parsedNotes : [];
    } catch (error) {
        console.error("Could not load saved notes:", error);
        return [];
    }
}

function saveNotes() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function updateCount() {
    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}

function render() {
    notesList.textContent = "";

    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredNotes = notes.filter((note) =>
        note.text.toLowerCase().includes(searchTerm)
    );

    updateCount();

    if (filteredNotes.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "empty-message";
        emptyItem.textContent = searchTerm
            ? "No notes match your search."
            : "No notes yet. Add one above.";
        notesList.appendChild(emptyItem);
        return;
    }

    filteredNotes.forEach((note) => {
        const listItem = document.createElement("li");
        listItem.classList.add("note-card");
        listItem.classList.add(`category-${note.category.toLowerCase()}`);

        const noteText = document.createElement("p");
        noteText.className = "note-text";
        noteText.textContent = note.text;

        const meta = document.createElement("div");
        meta.className = "note-meta";

        const categoryLabel = document.createElement("span");
        categoryLabel.className = "category-label";
        categoryLabel.textContent = note.category;

        const date = document.createElement("time");
        date.dateTime = note.createdAt;
        date.textContent = new Date(note.createdAt).toLocaleString();

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteNote(note.id));

        meta.append(categoryLabel, date, deleteButton);
        listItem.append(noteText, meta);
        notesList.appendChild(listItem);
    });
}

function addNote(text, category) {
    const note = {
        id: Date.now().toString(),
        text: text.trim(),
        category,
        createdAt: new Date().toISOString()
    };

    notes.push(note);
    saveNotes();
    render();
}

function deleteNote(id) {
    notes = notes.filter((note) => note.id !== id);
    saveNotes();
    render();
}

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    if (text.length === 0) {
        errorMessage.textContent = "Please type a note first.";
        noteInput.focus();
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        noteInput.focus();
        return;
    }

    errorMessage.textContent = "";
    addNote(text, category);
    noteForm.reset();
    noteInput.focus();
});

searchInput.addEventListener("input", render);

render();
