import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Note(props) {
  const [file, setFile] = useState('')
  //const [image, setImage] = useState([])
  const navigate = useNavigate()

  async function handleUpload(e) {
    e.preventDefault();

    const formdata = new FormData()
    formdata.append('file', file)
    await axios.post('http://localhost:8000/upload', formdata)
      .then(res => {
        setPhoto();
        alert("Uploaded successfully. If login require please login again.");
        navigate('/add_note');
      })
      .catch(err => console.log(err))
  }

  async function setPhoto() {
    await axios.post('http://localhost:8000/setImage', {_id: props.note?._id})
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <div className="col-sm-6 mb-3 mb-sm-0 my-4">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{props.note?.image ? <img src={`http://localhost:8000/Images/` + props.note?.image} width={'60px'} height={'40px'} alt='image'></img>:''}<b> {props.title}</b></h4>
          <p className="card-text">{props.description}</p>
          <p className="card-text">
            <small className="text-body-secondary my-4">
              On {props.date} at {props.time} || ({props.category})
              <Link to="/edit_note" onClick={() => { props.editNotes(props.note) }}>
                <button type='button' className='btn btn-outline-secondary btn-sm mx-2'>Edit</button>
              </Link>
              <button type='button' className='btn btn-outline-danger btn-sm mx-2' onClick={() => { props.deleteNotes(props.note) }} >Remove</button>
              <div className="mt-2">
                <label htmlFor="image">Choose photo </label>
                <input type="file" value={file.fileName} onChange={(e) => { setFile(e.target.files[0]) }} id="image" accept="image/png, image/jpeg" />
                <button className='btn btn-outline-secondary btn-sm' onClick={handleUpload}>Upload</button>
              </div>
            </small>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Note
