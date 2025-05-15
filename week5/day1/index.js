const path = require('path');
const { addNote, listNotes, deleteNote } = require('./utils/fileManager');
const runEventLoop = require('./utils/eventLoop');
const args = process.argv.slice(2);
const command = args[0];
switch (command) {
    case 'add':
        const content = args.slice(1).join(' ');
        if (!content) {
            console.log('Please provide note content.');
        } else {
            addNote(content);
        }
        break;
    case 'list':
        listNotes();
        break;
    case 'delete':
        const id = args[1];
        if (!id) {
            console.log('Please provide the ID of the note to delete.');
        } else {
            deleteNote(id);
        }
        break;
    case 'time':
        runEventLoop();
        break;

    default:
        console.log(` Note Manager CLI`);
}
