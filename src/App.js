import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AuthState from './Context/auth/AuthState';
import UserNote from './Components/UserNotes';


function App() {
  return (
    <>
    <AuthState>
      <NoteState>
      <Router>
      <NavBar/>
    <div className="container mt-2">
        <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/notes' element={<UserNote/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </div>
      </Router>
      </NoteState>
      </AuthState>
    </>
  );
}

export default App;
