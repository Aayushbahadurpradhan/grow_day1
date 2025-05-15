const fs = require('fs');
const path = require('path');
const generateId = require('./idGenerator');
const notesPath = path.join(__dirname, '../notes/notes.json');
if (!fs.existsSync(notesPath)) {
  fs.mkdirSync(path.dirname(notesPath), { recursive: true });
  fs.writeFileSync(notesPath, '[]', 'utf-8');
}
function readNotes() {
  try {
    const data = fs.readFileSync(notesPath, 'utf-8');
    return data.trim() === '' ? [] : JSON.parse(data);
  } catch (err) {
    console.error('Failed to read notes.json. Resetting to empty array.');
    writeNotes([]);
    return [];
  }
}
function writeNotes(notes) {
  fs.writeFileSync(notesPath, JSON.stringify(notes, null, 2), 'utf-8');
}
function addNote(content) {
  const notes = readNotes();
  const newNote = { id: generateId(), content };
  notes.push(newNote);
  writeNotes(notes);
  console.log('Note added:', newNote);
}
function listNotes() {
  const notes = readNotes();
  if (notes.length === 0) {
    console.log('No notes found.');
    return;
  }
  console.log('Notes:');
  notes.forEach(note => {
    console.log(`🔹 [${note.id}] ${note.content}`);
  });
}
function deleteNote(id) {
  const notes = readNotes();
  const newNotes = notes.filter(note => note.id !== id);
  if (notes.length === newNotes.length) {
    console.log('No note found with that ID.');
    return;
  }
  writeNotes(newNotes);
  console.log('Note deleted successfully.');
}
module.exports = { addNote, listNotes, deleteNote };
