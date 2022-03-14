import Note from "./Note"
import notesContext from "../Context/notes/notesContext"
import { useContext, useState } from "react"

const UserNote = () => {
  const context=useContext(notesContext);
  const {addNote}=context;
  const [note,setNote]=useState({title:"",description:"",tag:""});
  const handleNotes=(e)=>{
    setNote({...note,[e.target.name]:e.target.value});
  }
  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""});
  }
 

  return (
      <>
      <div className="container">    
    <h1>Create Notes</h1>
    <form>
    <div className="mb-3">
      <label htmlFor="title" className="form-label">Title</label>
      <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleNotes} aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
      <label htmlFor="description" className="form-label">Description</label>
      <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleNotes}/>
    </div>
    <div className="mb-3">
      <label htmlFor="tag" className="form-label">Tag</label>
      <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleNotes}/>
    </div>
    <button disabled={note.title.length===0 || note.description.length===0} type="submit" className="btn btn-primary" onClick={handleClick}>ADD NOTE</button>
  </form>
  </div>
  <div className="container mt-3">
  <Note/>
  </div>
  </>
  )
}

export default UserNote
