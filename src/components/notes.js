import React, {useState, useEffect} from 'react'
import {Modal} from 'react-bootstrap'

function Notes() {
  const [lgShow, setLgShow] = useState(false);
  const [window, setWindow] = useState(false);
  const [editWnd, setEditWnd] = useState(false);
  const [ newNote, setNewNote ] = useState({ noteTittle: "", description: "", note: ""});
  const [ editNote, setEditNote ] = useState({});

  let notesArr = localStorage.notesArray;
  const [notes, setNotes]=useState([])
  const [noteDetail, setNoteDetail]=useState({})
  // const inputPassword = useRef();
  // const inputEmail = useRef();

  function handleInputChange( e ){
    const { id, value } = e.target; 
    setNewNote( { ...newNote, [id]: value } );
    }
  function handleNoteInputChange( e ){
    const { id, value } = e.target; 
    setEditNote( { [id]: value } );
    }
  function loadNotes(){
    if(notesArr){
      let notesArray =  JSON.parse(localStorage.notesArray);
      console.log('updated: ', notesArray)
      setNotes(notesArray)
    }
  }
  async function deleteAll(){
    localStorage.clear();
    setNotes([])
  }
  function submitNote(e){
    // e.preventDefault()
    if(notesArr){
      let notesArray =  JSON.parse(notesArr);
      console.log("newNote",newNote)
      console.log("notes array: ", notesArray)
      notesArray.push(newNote);
      console.log("notes array: ", notesArray)
      localStorage.setItem("notesArray", JSON.stringify(notesArray));
      setNotes(notesArray)
      setNewNote({ noteTittle: "", description: ""});
      loadNotes()
      setLgShow(false)
    }else {
      let notesArray =  [];
      notesArray.push(newNote);
      console.log("notes array: ", notesArray)
      localStorage.setItem("notesArray", JSON.stringify(notesArray));
      setNewNote({ noteTittle: "", description: "", note: ""});
      setNotes(notesArray)
      loadNotes()
      setLgShow(false)
      document.location.reload(true);
    }
  }
  function showDetail(detail, idx){
    setWindow(true)
    console.log('detail: ', detail)
    let detailObj ={
      id: idx,
      detail: detail
    }
    console.log('detailObj: ', detailObj)
    setNoteDetail(detailObj);
  }
  function saveNote(id){
    console.log('id: ', id)
    let notesArray =  JSON.parse(localStorage.notesArray);
    console.log('notesArray: ', notesArray[id])
    notesArray[id].note = editNote.note;
    localStorage.setItem("notesArray", JSON.stringify(notesArray));
    setNotes(notesArray)
    let detailObj ={
      id: id,
      detail: notesArray[id]
    }
    setNoteDetail(detailObj);
    setEditNote({note: ''});
    setEditWnd(false)
  }
  useEffect(function(){
    loadNotes()
  },[])
  return (
    <div>
      <div className="d-flex mt-2 mb-2">
        <div className="myBtnRnd" onClick={deleteAll}>Delete All</div>
        <div className="myBtnRnd">Sort</div>
      </div>
      {window === true?
      <div className="detailWndo">
        <div className="col-8 mx-auto">
            <div className="d-flex justify-content-end">
              <i className="fas fa-2x fa-times cursor"  onClick={()=> setWindow(false)}></i>
            </div>
            <h1>{noteDetail.detail.noteTittle}</h1>
            <h4>{noteDetail.detail.description}</h4>
            <div className="d-flex justify-content-end">
              <i className="fas fa-edit cursor" style={{fontSize: '1.4rem', padding: '5px'}} onClick={()=> setEditWnd(true)}></i>
            </div>
            <p>{noteDetail.detail.note}</p>
            {editWnd===true ?
              <div>
                <textarea className="col-12 mx-auto" value={editNote.note} onChange={handleNoteInputChange} id="note">
                </textarea>
                <div className="d-flex justify-content-between">
                  <div className="myBtnRnd" onClick={()=>saveNote(noteDetail.id)}>Save</div>
                  <div className="myBtnRnd" onClick={()=>setEditWnd(false)}>Cancel</div>
                </div>
              </div>
              : ''}
        </div>
      </div>
      : ''}
      <div>
        <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg"> New Note
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form>
                  <div className="form-group">
                      <label for="noteTittle">Note Tittle</label>
                      <input type="text" className="form-control" 
                      id="noteTittle" aria-describedby="taskHelp" onChange={handleInputChange} 
                      value={newNote.noteTittle}/>
                      <div className="form-group">
                          <label for="description">Note Description</label>
                          <input
                          value={newNote.description} 
                          onChange={handleInputChange} 
                          id="description"
                          type="text" className="form-control"/>
                      </div>
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={submitNote}>Submit</button>
              </form>
          </Modal.Body>
        </Modal> 
        <div className="row col-10 mx-auto">
          <div className="card mt-4 note mx-auto">
            <div className="card-body">
              <h5 className="card-title">Add note</h5>
              <div className="cursor myBtnRnd2 mx-auto mt-5" onClick={()=>setLgShow(true)}><i className="fas fa-plus" style={{margin: '16px auto', fontSize: '3rem'}}></i></div>
            </div>
          </div>
          {notes.map((note,idx)=>
          <div key={`nts-${idx}`} className="myNoteCard greenC mt-4 note mx-auto">
            <div className="card-header">
              {idx+1}
            </div>
            <div className="card-body">
              <h3 className="card-title">{note.noteTittle}</h3>
              <p className="card-text">{note.description.slice(0, 15)}</p>
              <a href="#" className="btn btn-primary" onClick={()=>showDetail(note, idx)}>view detail</a>
            </div>
          </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default Notes
