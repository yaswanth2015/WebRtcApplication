
import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp'
import UserListWithNavigate from './Components/UserList';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Login />}/>
          <Route path='/signup' element = { <SignUp /> }/>
          <Route path="/users" element = { <UserListWithNavigate /> } />
          <Route path='/login' element = {<Navigate to={"/"}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
