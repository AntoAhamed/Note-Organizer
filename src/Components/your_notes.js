import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Note from './Note'

function Your_notes(props) {
  const [searchTitle, setSearchTitle] = useState('')
  const [filterCat, setFilterCat] = useState('')

  async function search(e) {
    e.preventDefault();

    setFilterCat('');

    if (searchTitle !== '') {
      try {
        await axios.post('http://localhost:8000/searchByTitle', { searchTitle })
          .then(res => {
            if (res.data === "failed") {
              alert("Note not found");
            }
            else {
              const data = res.data;
              console.log("Data has been received successfully");
              props.setNotes(data.data);
              console.log(data);
            }
          }).catch(e => {
            console.log(e);
          });
      }
      catch (e) {
        console.log(e);
      }
    } else {
      alert("Empty field can't be submitted!");
    }
  }

  async function filter(e) {
    e.preventDefault();

    setSearchTitle('');

    if (filterCat !== '') {
      try {
        await axios.post('http://localhost:8000/filterByCat', { filterCat })
          .then(res => {
            if (res.data === "failed") {
              alert("Note not found");
            }
            else {
              const data = res.data;
              console.log("Data has been received successfully");
              props.setNotes(data.data);
              console.log(data);
            }
          }).catch(e => {
            console.log(e);
          });
      }
      catch (e) {
        console.log(e);
      }
    } else {
      alert("Empty field can't be submitted!");
    }
  }

  async function getData() {
    await axios.get("http://localhost:8000/get_notes")
      .then(res => {
        const data = res.data;
        console.log("Data has been received successfully");
        props.setNotes(data.data);
        console.log(data);
      }).catch(e => {
        console.log("Data retrive unsuccessfull");
        console.log(e);
      })
  }

  useEffect(() => {
    if(searchTitle === '' && filterCat === ''){
      getData();
    }
  }, [props.notes])

  return (
    <div className='container' style={{ marginTop: '5%' }}>
      <div className="row mb-3">

        <div className='col-4'>
          <form className="d-flex py-4" role="search">
            <input className="form-control me-2" value={searchTitle} onChange={(e) => { setSearchTitle(e.target.value) }} type="search" placeholder="Search by title" aria-label="Search" />
            <button className="btn btn-outline-dark" onClick={search} type="submit">Search</button>
          </form>
        </div>

        <div className="col-4" style={{ textAlign: "center", fontSize: "45px", paddingBottom: "30px" }}>
          <b>Your Notes</b>
        </div>

        <div className='col-4'>
          <form className="d-flex py-4" role="search">
            <input className="form-control me-2" value={filterCat} onChange={(e) => { setFilterCat(e.target.value) }} type="search" placeholder="Filter by category" aria-label="Search" />
            <button className="btn btn-outline-dark" onClick={filter} type="submit">Filter</button>
          </form>
        </div>

      </div>
      <div className="row">
        {props.notes.length === 0 ? "No notes found" : props.notes.map((note) => {
          return <Note key={note._id} note={note} title={note.title} description={note.description} category={note.category} date={note.date} time={note.time} deleteNotes={props.deleteNotes} editNotes={props.editNotes} />
        })}
      </div>
    </div>
  )
}

export default Your_notes
