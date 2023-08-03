import React from 'react'

function add_note() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div class="mb-3">
                        <label for="title" class="form-label">Title</label>
                        <input type="text" class="form-control" id="title" placeholder="Enter title" />
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description</label>
                        <textarea class="form-control" id="description" rows="5" placeholder="Enter description"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="category" class="form-label">Category</label>
                        <input type="text" class="form-control" id="category" placeholder="Enter category" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default add_note
