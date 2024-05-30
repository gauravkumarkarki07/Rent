import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import LoggedInHeader from './components/LoggedInHeader.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';
import FindProperty from './pages/FindProperty.jsx';
import MyProperty from './pages/MyProperty.jsx';
import AddNewProperty from './pages/AddNewProperty.jsx';


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
        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/findproperty' element={<FindProperty/>}/>
          <Route path='/myproperty' element={<MyProperty/>}/>
          <Route path='/addnewproperty' element={<AddNewProperty/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
