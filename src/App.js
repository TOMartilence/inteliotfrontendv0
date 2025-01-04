import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Members from './Pages/Members';
import Projects from './Pages/Projects';
import Gallery from "./Pages/Gallery";
import Project101 from './Pages/Project101';
import Events from "./Pages/Events"
import Faq from "./Pages/Faq"
import Admin from './Pages/Admin';
import About from './Pages/About';
import AdminConsole from './Pages/AdminConsole'; 
import VideoForm from './Components/VideoForm';
import TimelinePage from './Pages/TimelinePage';
import StudentRegister from "./Pages/StudentRegister"; 
import Resources from './Pages/Resources';
import IoRTpage from './Pages/IoRTpage';
function App() {
  console.log(process.env.REACT_APP_backendbaseurl);
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/members' element={<Members/>}/>
          <Route path='/timeline' element={<TimelinePage/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/resources' element={<Resources/>}/>
          <Route path='/videoform' element={<VideoForm/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/gallery' element={<Gallery/>}/>
          <Route path='/101' element={<Project101/>}/>
          <Route path='/events' element={<Events/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/faq' element={<Faq/>}/>
          <Route path='/adminconsole' element={<AdminConsole/>}/>
          <Route path = '/register' element = {<StudentRegister/>}/>
          <Route path = '/iort' element = {<IoRTpage/>}/>

        </Routes>

      </Router>
    </>
  );
}

export default App;
