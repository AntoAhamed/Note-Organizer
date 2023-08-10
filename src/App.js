import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import Signup from './Components/Signup';
import AddNote from './Components/Add_note';
import YourNotes from './Components/Your_notes';
import EditNote from './Components/Edit_note'
import AddCategory from './Components/Add_category'
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState({})
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [toEditNote, setToEditNote] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newCat, setNewCat] = useState('')

  async function remove(_id) {
    try {
      await axios.post('http://localhost:8000/delete_note', { _id })
        .then(res => {
          if (res.data === "success") {
            alert("Note successfully removed");
          }
          else {
            alert("Something went wrong. Note can not be removed!");
          }
        }).catch(e => {
          console.log(e);
        });
    }
    catch (e) {
      console.log(e);
    }
  }

  const deleteNotes = (note) => {
    remove(note._id);
  }

  const editNotes = (note) => {
    setToEditNote(note);
    setNewTitle(note.title);
    setNewDesc(note.description);
    setNewCat(note.category);
  }

  return (
    <div className='App'>
      {/*This is my full app */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar user={user} setUser={setUser} />}>
            <Route index element={<Login setUser={setUser} />} />
            <Route path="signup" element={<Signup />} />
            <Route path="add_note" element={user && user._id ? <AddNote title={title} setTitle={setTitle} description={description} setDescription={setDescription} category={category} setCategory={setCategory} user={user} setUser={setUser} /> : <Login setUser={setUser} />} />
            <Route path="your_notes" element={user && user._id ? <YourNotes notes={notes} editNotes={editNotes} deleteNotes={deleteNotes} setNotes={setNotes} user={user} setUser={setUser} /> : <Login setUser={setUser} />} />
            <Route path="edit_note" element={<EditNote toEditNote={toEditNote} newTitle={newTitle} newDesc={newDesc} newCat={newCat} setNewTitle={setNewTitle} setNewDesc={setNewDesc} setNewCat={setNewCat} />} />
            <Route path="add_category" element={user && user._id ? <AddCategory /> : <Login setUser={setUser} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
