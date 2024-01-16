import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Landingpage from './Components/Landingpage';
import Homepgae from './Components/Homepgae';
import ForgotPass from './Components/ForgotPass';
import Auth from './Components/Auth';
import Stories from './Components/Stories';
import Project from './Components/Project';
import ProjectId from './Contexts/ProjectId';


function App() {
  return (
    <BrowserRouter>
    <ProjectId>
    <Routes>
      <Route path='/' element={<Landingpage />} />
      <Route path='/login' element={<Auth />} />
      <Route path='/home' element={<Homepgae />} />
      <Route path='/Reset-Password' element={<ForgotPass />} />
      <Route path='/stories' element={<Stories />}/>
      <Route path='/project/:id' element={<Project />} />
    </Routes>
    </ProjectId>
    </BrowserRouter>
  );
}

export default App;
