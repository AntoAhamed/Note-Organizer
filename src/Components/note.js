import React from 'react'
import { Link } from 'react-router-dom'

function Note(props) {
  return (
    <div className="col-sm-6 mb-3 mb-sm-0 my-4">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title"><b>{props.title}</b></h4>
          <p className="card-text">{props.description}</p>
          <p className="card-text">
            <small className="text-body-secondary my-4">
              On {props.date} at {props.time} || ({props.category})
              <Link to="/edit_note" onClick={() => { props.editNotes(props.note) }}>
                <button type='button' className='btn btn-outline-secondary btn-sm mx-2'>Edit</button>
              </Link>
              <button type='button' className='btn btn-outline-danger btn-sm mx-2' onClick={() => { props.deleteNotes(props.note) }} >Remove</button>
            </small>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Note
