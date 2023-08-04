import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Edit_note(props) {
  const navigate = useNavigate();

  async function save(e) {
    e.preventDefault();

    if (props.newTitle !== '' && props.newDesc !== '' && props.newCat !== '') {
      try {
        await axios.post('http://localhost:8000/edit_note', { title: props.newTitle, description: props.newDesc, category: props.newCat, _id: props.toEditNote?._id })
          .then(res => {
            if (res.data === "success") {
              alert("Edited successfully.");
              props.setNewTitle('');
              props.setNewDesc('');
              props.setNewCat('');
              navigate("/your_notes");
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

    props.setNewTitle('');
    props.setNewDesc('');
    props.setNewCat('');
  }

  return (
    <div className='container'>
      <div className="row mb-3">
        <div className="col" style={{ textAlign: "center", fontSize: "45px", paddingBottom: "30px" }}>
          <b>Edit Note</b>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <form action='' method='post' className='edit-note'>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" value={props.newTitle} onChange={(e) => { props.setNewTitle(e.target.value) }} id="title" placeholder="Enter title" />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" value={props.newDesc} onChange={(e) => { props.setNewDesc(e.target.value) }} id="description" rows="5" placeholder="Enter description"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <input type="text" className="form-control" value={props.newCat} onChange={(e) => { props.setNewCat(e.target.value) }} id="category" placeholder="Enter category" />
            </div>
            <button type="submit" onClick={save} className="btn btn-outline-dark">Save</button>
            <button type="reset" onClick={reset} className="btn btn-outline-dark mx-2">Reset</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Edit_note
