import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import LoggedInHeader from './components/LoggedInHeader.jsx';


export default function App() {
  const session=useSelector(state=>state.user.session);

  return (
    <BrowserRouter>
    <ToastContainer
      pauseOnHover={false}
    />
    {session ? <LoggedInHeader/>:<Header/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  )
}
