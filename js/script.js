const addNote = document.querySelector(".add-note");
const closeModal =  document.querySelector('#close-modal'); 
const modal = document.querySelector('#modal'); 
const modalView = document.querySelector('#modal-view'); 
const allNotesDiv = document.querySelector('#notes');
const btnSaveNote = document.querySelector("#btn-save-note"); 
const btnCloseNote = document.querySelector("#btn-close-note");
const editNote = document.querySelector(".Editar");
const deleteNote = document.querySelector(".Excluir");
const inputTitle = document.querySelector("#input-title");
const inputContent = document.querySelector("#input-content");


//--------------------------------EVENTS--------------------------------//




addNote.addEventListener("click", (evt) => {

    evt.preventDefault();
    allNotesDiv.style.display='none';
    modal.style.display='block';
    addNote.style.display='none';
    inputTitle.value = "";
    inputContent.value =  "";

});

btnCloseNote.addEventListener("click", (evt) => {

    evt.preventDefault();
    closeNote();

});

btnSaveNote.addEventListener("click", (evt) => {

    evt.preventDefault();
    let noteData = {

        id: document.querySelector("#input-id").value,
        title:document.querySelector("#input-title").value,
        content:document.querySelector("#input-content").value,

      
    };
    saveNote(noteData);

});

//--------------------------------FUNCTIONS--------------------------------//

const saveNote = (lastNoteData) => {
    let notesLoaded = loadNotes();
    
    lastNoteData.lastTime = new Date().getTime();
   
    if(lastNoteData.id.length > 0){

        lastNoteData.id = parseInt(lastNoteData.id);

        notesLoaded.forEach((thisNote, i) => {
            if(thisNote.id == lastNoteData.id){
                notesLoaded [i] = lastNoteData;
            }
        })
    }else{
        lastNoteData.id = new Date().getTime();
        document.querySelector('#input-id').value = lastNoteData.id;
        notesLoaded.push(lastNoteData);
    }

    notesLoaded = JSON.stringify(notesLoaded);
   
    localStorage.setItem('allNotesStorage',  notesLoaded);
};

const loadNotes = () => {
    let notesLoading = localStorage.getItem('allNotesStorage');//tava string
    if(!notesLoading ){
        notesLoading  = [];
    }else{
        notesLoading  = JSON.parse(notesLoading);//viro json

    }
    return notesLoading ;
};

const closeNote = () =>{

    allNotesDiv.style.display="flex";
    modal.style.display="none";
    addNote.style.display='block';
    modalView.style.display = 'none';
    document.querySelector('#input-id').value = "";
    listNotesFun();

}

    const confirmDelete = document.createElement('div');
    confirmDelete.className = "confirmDelete";
    confirmDelete.style.width="18rempx";
    const confirmText = document.createElement('p');
    confirmText.innerHTML = "Excluir a Nota Permanentemente?"
    const buttons = document.createElement('div');
    buttons.style.display ="flex";
    confirmDelete.style.paddingTop ="4vh";
    buttons.style.justifyContent ="space-around";
    const yesButton = document.createElement('button');
    const noButton = document.createElement('button');
    noButton.className =  'yesButon bi bi-x-lg noteIcon ';
    yesButton.className =  'noButon bi bi-check-lg noteIconRed ';
    noButton.style.background = "none"; 
    yesButton.style.background =  "none"
    yesButton.style.border=  "none"
    noButton.style.border=  "none"
    modalView.appendChild(confirmDelete);
    confirmDelete.appendChild(confirmText);
    confirmDelete.appendChild(buttons);
    confirmDelete.appendChild(yesButton);
    confirmDelete.appendChild(noButton);

const deleteNoteFun = (noteHere) => 
{


    let listNotes = loadNotes();
 

  deleteNote.style.display = "none";
  confirmDelete.style.display ="block";

    yesButton.addEventListener("click", (evt) => { 
        
        listNotes.forEach((noteListObject, i) =>
        {
            if(noteHere.id == noteListObject.id )
            {
                listNotes.splice(i, 1);
                listNotes = JSON.stringify(listNotes);
                localStorage.setItem('allNotesStorage',  listNotes);
                closeNote();
            }
        })
        confirmDelete.style.display ="none";
        deleteNote.style.display = "";
        }
        )      

    noButton.addEventListener("click", (evt) =>  
    {
        confirmDelete.style.display ="none";
        deleteNote.style.display = "";
    })

    
}

const editNoteFun = (noteHere) => 
{
    modal.style.display = 'block';
    modalView.style.display = 'none';
    inputTitle.value =noteHere.title;
    inputContent.value = noteHere.content;
}

const showNote = (selectedNote) => 
{

    allNotesDiv.style.display = 'none';
    modalView.style.display = 'block';
    addNote.style.display = 'none';

    document.querySelector('#title-note').innerHTML = "<h1>"+selectedNote.title+"</h1>";
    document.querySelector('#content-note').innerHTML = "<p>"+selectedNote.content+"</p>";
    document.querySelector('#content-note').innerHTML += "<p>Última atualização: "+new Date(selectedNote.lastTime).toLocaleDateString('pt-BR')+" "+new Date(selectedNote.lastTime).toLocaleTimeString('pt-BR')+"</p>";
    document.querySelector("#input-id").value = selectedNote.id;

    editNote.addEventListener('click' , (evt) =>{

        evt.preventDefault();
        editNoteFun(selectedNote)
    
    })

    deleteNote.addEventListener('click', (evt) =>{
        evt.preventDefault();
        deleteNoteFun(selectedNote);
    
        })
      

}

const listNotesFun = () => {

    let listNotes = loadNotes();
    allNotesDiv.innerHTML = "";
   
if(!listNotes){}
else
    listNotes.forEach((thisNote) => 
    {
        
        const divCard = document.createElement('div');
        divCard.className = 'card';
        divCard.style.width = '18rem';
        divCard.style.margin = '1vw';
        divCard.style.border = 'solid 2px  #9b93bd ';
   


        const divCardBody = document.createElement('div');
        divCardBody.className = 'card-body';

        const h1 = document.createElement('h1');
        h1.className = 'card-title';
        h1.innerText = thisNote.title;

        const pContent = document.createElement('p');
        pContent.className = 'card-text';
        pContent.innerText = thisNote.content;

        const pLastTime = document.createElement('p');
        let lastTimeHere = new Date(thisNote.lastTime).toLocaleDateString('pt-BR');
        pLastTime.innerText = `Última atualização: ${lastTimeHere}`;

        divCard.appendChild(divCardBody);
        divCardBody.appendChild(h1);
        divCardBody.appendChild(pContent);
        divCardBody.appendChild(pLastTime);
        allNotesDiv.appendChild(divCard);
        
     
        
        divCard.addEventListener("click", (evt) => {

            evt.preventDefault();
            showNote(thisNote);

        });


    });
};







listNotesFun();



