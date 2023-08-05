import axios from 'axios';
import React, { useState } from 'react'

function Add_category() {
    const [newCategory, setNewCategory] = useState('')

    async function save(e){
        e.preventDefault();

        if (newCategory !== '') {
            try {
              await axios.post('http://localhost:8000/add_category', { newCategory })
                .then(res => {
                  if (res.data === "success") {
                    alert("Added successfully.");
                    setNewCategory('');
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

    return (
        <>
            <div className='container'>
                <div className="row mb-3">
                    <div className="col" style={{ textAlign: "center", fontSize: "45px", paddingBottom: "30px" }}>
                        <b>Add Category</b>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <form action='' method='post' className='add-category'>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Category</label>
                                <input type="text" className="form-control" value={newCategory} onChange={(e)=>{setNewCategory(e.target.value)}} id="category" placeholder="Enter category" />
                            </div>
                            <button type="submit" onClick={save} className="btn btn-outline-dark">save</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Add_category
