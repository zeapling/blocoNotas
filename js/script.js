const addNote = document.querySelector('#add-note');
const closeModal =  document.querySelector('#close-modal'); 
const modal = document.querySelector('#modal'); 
const modalView = document.querySelector('#modal-view'); 
const notes = document.querySelector('#notes');
const btnSaveNote = document.querySelector("#btn-save-note"); 
const btnCloseNote = document.querySelector("#btn-close-note");
const editar = document.querySelector(".Editar");
const Excluir = document.querySelector(".Excluir");
// ------------------------------------------------------------------
// ---------------------------EVENTOS--------------------------------
// ------------------------------------------------------------------

addNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    console.log("Botão abrindo!");
    notes.style.display='none';
    modal.style.display='block';
    addNote.style.display='none';
});

btnCloseNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    console.log("Botão fechando!");
    notes.style.display="flex";
    modal.style.display="none";
    addNote.style.display='block';
    document.querySelector('#input-id').value = "";
    listNotes();
});

btnSaveNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    let data = {
        id: document.querySelector("#input-id").value,
        title:document.querySelector("#input-title").value,
        content:document.querySelector("#input-content").value,
    };
    saveNote(data);
});

// ------------------------------------------------------------------
// ---------------------------FUNÇÕES--------------------------------
// ------------------------------------------------------------------

const saveNote = (note) => {
    let notes = loadNotes();
    note.lastTime = new Date().getTime();
    // console.log(note.lastTime);
    if(note.id.length > 0){
        notes.forEach((item, i) => {
            note.id = parseInt(note.id);
            if(item.id == note.id){
                notes[i] = note;
            }
        })
    }else{
        note.id = new Date().getTime();
        document.querySelector('#input-id').value = note.id;
        notes.push(note);
    }
    // console.log(notes);
    notes = JSON.stringify(notes);
    // console.log(notes);
    localStorage.setItem('notes', notes);
};

const loadNotes = () => {
    let notes = localStorage.getItem('notes');
    if(!notes){
        notes = [];
    }else{
        notes = JSON.parse(notes);

    }
    return notes;
};

const listNotes = () => {
    let listNotes = localStorage.getItem('notes');
    listNotes = JSON.parse(listNotes);
    notes.innerHTML = "";
    listNotes.forEach((item) => {
        const divCard = document.createElement('div');
        divCard.className = 'card';
        divCard.style.width = '18rem';
        const divCardBody = document.createElement('div');
        divCardBody.className = 'card-body';
        const h1 = document.createElement('h1');
        h1.className = 'card-title';
        h1.innerText = item.title;
        const pContent = document.createElement('p');
        pContent.className = 'card-text';
        pContent.innerText = item.content;
        console.log(item);
        const pLastTime = document.createElement('p');
        let lastTime = new Date(item.lastTime).toLocaleDateString('pt-BR');
        pLastTime.innerText = `Última atualização: ${lastTime}`;


        divCardBody.appendChild(h1);
        divCardBody.appendChild(pContent);
        divCardBody.appendChild(pLastTime);
        divCard.appendChild(divCardBody);
        notes.appendChild(divCard);

        divCard.addEventListener("click", (evt) => {
            evt.preventDefault();
            showNote(item);
        });

        closeModal.addEventListener("click", (evt) => {
            evt.preventDefault();
            notes.style.display = 'flex';
            modalView.style.display = 'none';
            addNote.style.display = 'block';
        });
    });
};

const showNote = (note) => {
    notes.style.display = 'none';
    modalView.style.display = 'block';
    addNote.style.display = 'none';

    document.querySelector('#title-note').innerHTML = "<h1>"+note.title+"</h1>";
    document.querySelector('#content-note').innerHTML = "<p>"+note.content+"</p>";
    document.querySelector('#content-note').innerHTML += "<p>Última atualização: "+new Date(note.lastTime).toLocaleDateString('pt-BR')+"</p>";



    editar.addEventListener('click', (evt) =>{
    evt.preventDefault();
  
    modal.style.display = 'block';
    modalView.style.display = 'none';
    document.querySelector("input-id").value = note.id;
})
excluir.addEventListener('click', (evt) =>{
    evt.preventDefault();
    excluirNote(note);


    })
  
}


let excluirNote = (noteHere) => {

    let notes = localStorage.getItem('notes');
   
    
    notes.forEach(item,i =>
    {

        
          var  removed = noteHere.splice(i, 1);
          saveNotes();
        
    }
    
    )
   

}

listNotes();
