const createNoteBtn = document.getElementById('createnotes');
const note= document.getElementById('notes');

createNoteBtn.addEventListener('click', function(){
    const newnote = document.createElement('div');
    newnote.classList.add('note');
    newnote.innerHTML = `<textarea name="text" placeholder="Write your notes here..." ></textarea><h4>✕</h4>`;
    note.appendChild(newnote);
    saveNotes();
    const deleteBtn = newnote.querySelector('h4');
    deleteBtn.addEventListener('click', function(){
        note.removeChild(newnote);
        saveNotes();
    });
});

//save notes to local storage
function saveNotes() {
    const notes = document.querySelectorAll('.note');
    const notesArray = [];
    notes.forEach(note => {
        const text = note.querySelector('textarea').value;
        notesArray.push(text);
    });
    localStorage.setItem('notes', JSON.stringify(notesArray));
}

//load notes from local storage
function loadNotes() {
    const notesArray = JSON.parse(localStorage.getItem('notes')) || [];
    notesArray.forEach(text => {
        const newnote = document.createElement('div');
        newnote.classList.add('note');
        newnote.innerHTML = `<textarea name="text" placeholder="Write your notes here..." >${text}</textarea><h4>✕</h4>`;
        note.appendChild(newnote);

        const deleteBtn = newnote.querySelector('h4');
        deleteBtn.addEventListener('click', function(){
            note.removeChild(newnote);
            saveNotes();
        }); 
        //how that delete button knows which  but how it delete corresponding note when there are multiple notes, it is because we are creating a new note element and adding an event listener to the delete button of that specific note. When the delete button is clicked, it will remove the corresponding note element from the DOM and then call the saveNotes function to update the local storage with the remaining notes.
    });
}

// Call loadNotes when the page loads
window.addEventListener('DOMContentLoaded', loadNotes);
// Call saveNotes whenever a note is changed
note.addEventListener('input', saveNotes);
