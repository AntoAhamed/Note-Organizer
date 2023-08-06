import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Add_note(props) {
  /*const [file, setFile] = useState('')
  const [image, setImage] = useState([])

  const handleUpload = async (e) => {
    const formdata = new FormData()
    formdata.append('file', file)
    await axios.post('http://localhost:8000/upload', formdata)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }*/

  async function save(e) {
    e.preventDefault();

    if (props.title !== '' && props.description !== '' && props.category !== '') {
      try {
        await axios.post('http://localhost:8000/add_note', { title: props.title, description: props.description, category: props.category, email: props.user?.email })
          .then(res => {
            if (res.data === "success") {
              alert("Added successfully.");
              props.setTitle('');
              props.setDescription('');
              props.setCategory('');
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

    props.setTitle('');
    props.setDescription('');
    props.setCategory('');
  }

  /*async function getPhoto(){
    await axios.get('http://localhost:8000/getImage')
    .then(res => setImage(res.data[11].image))
    .catch(err => console.log(err))
  }

  useEffect(()=>{
    getPhoto();
  },[])*/

  return (
    <div className='container' style={{ marginTop: '5%' }}>
      <div className="row mb-3">
        <div className="col" style={{ textAlign: "center", fontSize: "45px", paddingBottom: "30px" }}>
          <b>Add Notes</b>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <form action='' method='post' className='add-note'>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" value={props.title} onChange={(e) => { props.setTitle(e.target.value) }} id="title" placeholder="Enter title" />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" value={props.description} onChange={(e) => { props.setDescription(e.target.value) }} id="description" rows="5" placeholder="Enter description"></textarea>
            </div>
            {/*<div className='mb-3'>
              <label htmlFor="image">Choose photo </label>
              <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} id="image" accept="image/png, image/jpeg" />
              <button onClick={handleUpload}>Upload</button>
              <br />
              <img src={`http://localhost:8000/Images/` + image} width={'100px'} height={'100px'} alt=''></img>
  </div>*/}
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <input type="text" className="form-control" value={props.category} onChange={(e) => { props.setCategory(e.target.value) }} id="category" placeholder="Enter category" />
            </div>
            <button type="submit" onClick={save} className="btn btn-outline-dark">Save</button>
            <button type="reset" onClick={reset} className="btn btn-outline-dark mx-2">Reset</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Add_note
