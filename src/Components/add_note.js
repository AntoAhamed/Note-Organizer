import React, {useState} from 'react'

function Add_note() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div class="mb-3">
                        <label for="title" class="form-label">Title</label>
                        <input type="text" class="form-control" value={title} onChange={(e)=>{setTitle(e.target.value)}} id="title" placeholder="Enter title" />
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" value={description} onChange={(e)=>{setDescription(e.target.value)}} id="description" rows="5" placeholder="Enter description"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="category" class="form-label">Category</label>
                        <input type="text" class="form-control" value={category} onChange={(e)=>{setCategory(e.target.value)}} id="category" placeholder="Enter category" />
                    </div>
                    <button type="button" class="btn btn-outline-secondary">Save</button>
                    <button type="button" class="btn btn-outline-secondary mx-2">Reset</button>
                </div>
            </div>
        </div>
    )
}

export default Add_note
