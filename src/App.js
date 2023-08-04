import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import Signup from './Components/Signup';
import AddNote from './Components/Add_note';
import YourNotes from './Components/Your_notes';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState({})

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar user={user} setUser={setUser} />}>
            <Route index element={<Login setUser={setUser} />} />
            {/*<Route path="blogs" element={<Blogs />} />*/}
            <Route path="signup" element={<Signup />} />
            <Route path="add_note" element={user && user._id ? <AddNote user={user} setUser={setUser}/> : <Login setUser={setUser} />} />
            <Route path="your_notes" element={user && user._id ? <YourNotes user={user} setUser={setUser} /> : <Login setUser={setUser} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
