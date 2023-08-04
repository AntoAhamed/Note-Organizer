import React, { useState } from 'react'
import axios from 'axios'

function Add_note(props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  async function save(e) {
    e.preventDefault();

    if (title !== '' && description !== '' && category !== '') {
      try {
        await axios.post('http://localhost:8000/add_note', { title, description, category, email: props.user?.email })
          .then(res => {
            if (res.data === "success") {
              alert("Added successfully.");
              setTitle('');
              setDescription('');
              setCategory('');
            }
            else {
              alert("unsuccess");
            }
          }).catch(e => {
            console.log(e);
          });
      }
      catch (e) {
        console.log(e);
      }
    }
    else {
      alert("Empty field can't be submitted!");
    }
  }

  function reset(e) {
    e.preventDefault();

    setTitle('');
    setDescription('');
    setCategory('');
  }

  return (
    <div className='container'>
      <div className="row mb-3">
        <div className="col" style={{ textAlign: "center", fontSize: "45px", paddingBottom: "30px" }}>
          <b>Add Notes</b>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <form action='' method='post'>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" value={title} onChange={(e) => { setTitle(e.target.value) }} id="title" placeholder="Enter title" />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" value={description} onChange={(e) => { setDescription(e.target.value) }} id="description" rows="5" placeholder="Enter description"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <input type="text" className="form-control" value={category} onChange={(e) => { setCategory(e.target.value) }} id="category" placeholder="Enter category" />
            </div>
            <button type="submit" onClick={save} className="btn btn-outline-secondary">Save</button>
            <button type="reset" onClick={reset} className="btn btn-outline-secondary mx-2">Reset</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Add_note
