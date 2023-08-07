import axios from 'axios';
import React, { useState, useEffect } from 'react'

function Add_category() {
  const [newCategory, setNewCategory] = useState('')
  const [categories, setCategories] = useState([])

  async function save(e) {
    e.preventDefault();

    if (newCategory !== '') {
      try {
        await axios.post('http://localhost:8000/add_category', { newCategory })
          .then(res => {
            if (res.data === "success") {
              alert("Category added successfully");
              setNewCategory('');
            }
            else {
              alert("Category already exists!");
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

  async function remove(e) {
    try {
      await axios.post('http://localhost:8000/delete_category', { _id: e._id, category: e.category })
        .then(res => {
          if (res.data === "success") {
            alert("Category successfully removed");
          }
          else {
            alert("Note exists with this category");
          }
        }).catch(e => {
          console.log(e);
        });
    }
    catch (e) {
      console.log(e);
    }
  }

  const deleteCategory = (e) => {
    remove(e);
  }

  async function getCategories() {
    await axios.get("http://localhost:8000/get_categories")
      .then(res => {
        const data = res.data;
        console.log("Data has been received successfully");
        setCategories(data.data);
        console.log(data);
      }).catch(e => {
        console.log("Data retrive unsuccessfull");
        console.log(e);
      })
  }

  useEffect(() => {
    getCategories();
  }, [categories])

  return (
    <>
      <div className='container' style={{ marginTop: '5%' }}>
        <div className="row mb-3">
          <div className="col" style={{ textAlign: "center", fontSize: "45px", paddingBottom: "30px" }}>
            <b>Add Categories</b>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <form action='' method='post' className='add-category'>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" className="form-control" value={newCategory} onChange={(e) => { setNewCategory(e.target.value) }} id="category" placeholder="Enter category" />
              </div>
              <button type="submit" onClick={save} className="btn btn-outline-dark">save</button>
            </form>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className="row mb-3">
          <div className="col" style={{ textAlign: "center", fontSize: "30px", paddingBottom: "30px" }}>
            <b>Existing Categories</b>
          </div>
        </div>
        <div className='row add-category'>
          <div className='col'>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col" style={{ textAlign: 'center' }}>Category</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? "No categories found" : categories.map((e) => {
                  return <>
                    <tr key={e._id}>
                      <td style={{ textAlign: 'center' }}>
                        {e.category + ` `}
                        <button type='button' onClick={() => { deleteCategory(e) }} className='btn btn-outline-danger btn-sm mx-2' >Remove</button>
                      </td>
                    </tr>
                  </>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Add_category
