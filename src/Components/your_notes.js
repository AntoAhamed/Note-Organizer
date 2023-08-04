import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Note from './Note'

function Your_notes(props) {
  const [notes, setNotes] = useState([])

  async function getData() {
    await axios.get("http://localhost:8000/get_notes")
      .then(res => {
        const data = res.data;
        console.log("Data has been received successfully");
        setNotes(data.data);
        console.log(data);
      }).catch(e => {
        console.log("Data retrive unsuccessfull");
        console.log(e);
      })
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className='container'>
      <div className="row mb-3">

        <div className="col" style={{ textAlign: "center", fontSize: "45px", paddingBottom: "30px" }}>
          <b>Your Notes</b>
        </div>

      </div>
      <div className="row">
        {notes.length === 0 ? "No notes found" : notes.map((note) => {
          return <Note key={note._id} note={note} title={note.title} description={note.description} category={note.category} date={note.date} time={note.time} deleteNotes={props.deleteNotes} editNotes={props.editNotes} />
        })}
      </div>
    </div>
  )
}

export default Your_notes
