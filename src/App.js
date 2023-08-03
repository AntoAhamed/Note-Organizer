import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/navbar'
import Login from './Components/login'
import Signup from './Components/signup';
import AddNote from './Components/add_note';
import YourNotes from './Components/your_notes';

function App() {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Login />} />
            {/*<Route path="blogs" element={<Blogs />} />*/}
            <Route path="signup" element={<Signup />} />
            <Route path="add_note" element={<AddNote />} />
            <Route path="your_notes" element={<YourNotes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
