
import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp'
import UserListWithSocketProvider from './Components/UserList';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Chat from './Components/Chat';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Login />}/>
          <Route path='/signup' element = { <SignUp /> }/>
          <Route path="/:userId" >
            <Route path = "" element = { <UserListWithSocketProvider /> } />
            <Route path = "connect" element = {<Chat />}/>
          </Route>
          <Route path='/login' element = {<Navigate to={"/"}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
