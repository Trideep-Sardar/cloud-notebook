import React from 'react'
import notesContext from "../Context/notes/notesContext"
import { useContext } from "react"

const NoteItem = (props) => {
    const{item,updateNote}=props;
    const context=useContext(notesContext);
    const{deleteNote}=context;
    const handleDelete=()=>{
      deleteNote(item._id);
      console.log(item._id);
    }
  return (
    <>
    <div className="col-md-4 my-2" >
    <div className="card">
  <div className="card-body">
  <div className="d-flex align-items-center" style={{justifyContent:'space-between'}}>
    <h5 className="card-title">{item.title}</h5>
    <div className="i d-flex">
    <i className="fa-solid fa-trash-can mx-2" onClick={handleDelete}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(item)}}></i>
    </div>
  </div>
    <p className="card-text">{item.description}</p>
    <p className="card-text">{item.tag}</p>
  </div>
</div>
    </div>
    </>
  )
}

export default NoteItem
